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
  getAllBuildingsLocations,
} from '../models/building/building-models';
import { wrap } from '../util/wrapper';

class BuildingController extends Controller {
  public path = '/building';
  public idPrefix: string = '/:id';

  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.getBuildings);
    this.router.get(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.getBuildingByID
    );

    this.router.get(
      this.path + this.idPrefix + '/location',
      [param('id').isNumeric()],
      this.getBuildingsLocations
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

  getBuildings = async (req: Request, res: Response) => {
    try {
      let buildings = await getAllBuildings();
      return res.json(wrap(buildings));
    } catch (err) {
      res.status(500).json({ errors: err.detail });
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
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
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
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  patchBuilding = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    let building: Building = req.body;
    try {
      building.id = id;
      let results = await updateBuilding(building);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
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
      return res.status(200).json(wrap({ rows }));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getBuildingsLocations = async (req: Request, res: Response) => {
    try {
      let id: string = req.params.id;
      let locations = await getAllBuildingsLocations(id);
      return res.json(wrap(locations));
    } catch (err) {
      res.status(500).json({ errors: err.detail });
    }
  };
}

export default BuildingController;
