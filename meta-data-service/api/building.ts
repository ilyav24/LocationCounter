import { Building } from './../models/building/building';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import {
  getAllBuildings,
  insertBuilding,
  deleteBuilding,
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
    // this.router.get(
    //   this.path + this.idPrefix,
    //   [param('id').isNumeric()],
    //   this.getLocationById
    // );
    this.router.post(
      this.path,
      [check('number_of_floors').isNumeric()],
      this.generateBuilding
    );

    // this.router.patch(
    //   this.path + this.idPrefix,
    //   [param('id').isNumeric()],
    //   this.patchLocation
    // );

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

  // getLocationById = (req: Request, res: Response): Response => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(404).json({ errors: errors.array() });
  //   }

  //   let id: string = req.params.id;
  //   let item: Location | undefined = locations.find(
  //     (x: Location) => x.id == parseInt(id)
  //   );
  //   if (!item) {
  //     return res.status(404).json({ error: 'Not found' });
  //   }
  //   return res.status(200).send(item);
  // };

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

  // patchLocation = (req: Request, res: Response): Response => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(404).json({ errors: errors.array() });
  //   }
  //   let id: string = req.params.id;
  //   let item: Location | undefined = locations.find(
  //     (x: Location) => x.id == parseInt(id)
  //   );
  //   if (!item) {
  //     return res.status(404).json({ error: 'Not found' });
  //   }
  //   let { floor, room_number, build_number, entry } = req.body;
  //   item.floor = floor;
  //   item.room_number = room_number;
  //   item.build_number = build_number;
  //   item.entry = entry;

  //   return res.status(200).send(item);
  // };

  deleteBuilding = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      await deleteBuilding(id);
      return res.status(200).send(wrap(true)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };
  //   return res.status(200).json();
  // };
}

export default BuildingContoller;
