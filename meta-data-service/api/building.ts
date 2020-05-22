import { Building } from './../models/building/building';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import {
  getAllBuildings,
  insertBuilding,
  deleteBuilding,
  updateBuilding,
  getBuildingById,
} from '../models/building/building-models';
import { wrap } from '../util/wrapper';

class BuildingContoller extends Controller {
  public path = '/building';
  public idPrefix: string = '/:id';

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, this.getBuildings);
    this.router.get(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.getBuildingByID
    );
    this.router.post(
      this.path,
      [check('number_of_floors').isNumeric()],
      this.generateBuilding
    );

    this.router.patch(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.patchBuilding
    );

    this.router.delete(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.deleteBuilding
    );
  }

  getBuildings = async (req: Request, res: Response): Promise<Response> => {
    try {
      let buildings = await getAllBuildings();
      return res.status(200).send(wrap(buildings)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  getBuildingByID = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      let results = await getBuildingById(id);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  generateBuilding = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let buidling: Building = req.body;
    try {
      let results = await insertBuilding(buidling);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  patchBuilding = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    let buidling: Building = req.body;
    try {
      buidling.id = id;
      let results = await updateBuilding(buidling);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  deleteBuilding = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      let rows = await deleteBuilding(id);
      return res.status(200).send(wrap({ rows })).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };
  //   return res.status(200).json();
  // };
}

export default BuildingContoller;
