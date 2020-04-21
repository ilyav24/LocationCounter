import { Response } from 'express';
import { Request } from 'express';
import express from 'express';
import { param, validationResult } from 'express-validator';
import { Location } from '../models/location';

let locations: Location[] = [];
let temp: number = 0;

class LocationController {
  public path = '/location';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getLocations);
    this.router.get(
      this.path + '/:id',
      [param('id').isNumeric()],
      this.getLocationById
    );
    this.router.post(this.path, this.generateLocation);
  }

  getLocations = (req: Request, res: Response): void => {
    res.status(200).send(locations).json();
  };

  getLocationById = (req: Request, res: Response): void => {
    const errors = validationResult(req);
    let id: string = req.params.id;
    let item: Location | undefined = locations.find(
      (x: Location) => x.id == parseInt(id)
    );
    res.status(200).send(item);
    if (!errors.isEmpty()) {
      res.status(404).send('not found');
    }
  };

  generateLocation = (req: Request, res: Response) => {
    let location: Location = {
      id: ++temp,
      floor: req.body.floor,
      room_number: req.body.room_number,
      build_number: req.body.build_number,
      entry: req.body.room_number,
    };
    locations.push(location);
    res.status(200).send(location).json();
  };
}

export default LocationController;
