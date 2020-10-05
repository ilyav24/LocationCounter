import { User } from './../models/users/user';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  updateUserDetails,
  deleteUser,
  insertUser,
  DeleteUserByEmail,
  checkEmail, 
  checkUsername,
  checkEmail2,
  checkUsername2
} from '../models/users/user-models';
import { wrap } from '../util/wrapper';

class UserController extends Controller {
  public path = '/users';
  public idPrefix: string = '/:id';

  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getUsers);
    this.router.get(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.getUserDetailsById
    );

    this.router.post(
      this.path,
      [check('email').isEmail(), check('user_type').isNumeric()],
      this.insertNewUser
    );

    this.router.patch(
      this.path + this.idPrefix,
      [check('email').isEmail(), check('user_type').isNumeric()],
      this.updateUser
    );

    this.router.delete(
      this.path,
      [check('email').isEmail()],
      this.deleteUserByEmail
    );

    this.router.delete(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.deleteUserById
    );

  }

  getUsers = async (req: Request, res: Response) => {
    try {
      let users = await getAllUsers();
      return res.json(wrap(users));
    } catch (err) {
      res.status(500).json({ errors: err.detail });
    }
  };

  getUserDetailsById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      let results = await getUserById(id);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  insertNewUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let user: User = req.body;
    try {
      let check = await checkEmail(user);
      if(check==null)
      return res.status(403).json([{error:"Email already exists"}]);;
      let check2 = await checkUsername(user);
      if(check2==null)
      return res.status(403).json([{error:"Username already exists"}]);;
      let results = await insertUser(user);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: number = +req.params.id;
    let user: User = req.body;
    try {
      user.id = id;
      let check = await checkEmail2(user);
      if(check==null)
      return res.status(403).json([{error:"Email already exists"}]);;
      let check2 = await checkUsername2(user);
      if(check2==null)
      return res.status(403).json([{error:"Username already exists"}]);;
      let results = await updateUserDetails(user);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  deleteUserById = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: number = +req.params.id;
    try {
      let rows = await deleteUser(id);
      return res.status(200).json(wrap({ rows }));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

   deleteUserByEmail = async (req: Request, res: Response): Promise<Response> => {
     console.log('in delete by email');
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(404).json({ errors: errors.array() });
     }
     let email: string = req.body.email;
     try {
       let rows = await DeleteUserByEmail(email);
       return res.status(200).json(wrap({ rows }));
     } catch (err) {
       return res.status(500).json({ errors: err.detail });
     }
   };
}

export default UserController;
