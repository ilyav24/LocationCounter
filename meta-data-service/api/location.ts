import { wrap } from '../util/wrapper';
import { Location } from '../models/locations/location';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import {
  getAllLocations,
  insertLocation,
  deleteLocation,
  updateLocation,
  getLocationById,
} from '../models/locations/location-models';

//TODO: make checks in diffrent file?
class LocationController extends Controller {
  public path = '/location';
  public idPrefix: string = '/:id';

  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, this.getLocations);
    
    this.router.get(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.getLocationByID
    );

    this.router.post(
      this.path,
      [check('floor').isNumeric()],
      this.generateLocation
    );

    this.router.patch(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.patchLocation
    );

    this.router.delete(
      this.path + this.idPrefix,
      [param('id').isNumeric()],
      this.deleteLocation
    );
  }

  getLocations = async (req: Request, res: Response): Promise<Response> => {
    try {
      let locations = await getAllLocations();
      return res.status(200).send(wrap(locations)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  getLocationByID = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      let results = await getLocationById(id);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  generateLocation = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let location: Location = req.body;
    let results;
    try {
      results = await insertLocation(location);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  patchLocation = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    let location: Location = req.body;
    try {
      location.id = id;
      let results = await updateLocation(location);
      return res.status(200).send(wrap(results)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };

  deleteLocation = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      await deleteLocation(id);
      return res.status(200).send(wrap(true)).json();
    } catch (err) {
      return res.status(500).send({ errors: err.detail }).json();
    }
  };
}

export default LocationController;
