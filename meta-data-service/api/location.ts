import { Location } from './../models/location';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';

let locations: Location[] = [
  { id: 1, floor: 2, build_number: 3, room_number: 4, entry: 5 },
];
let temp: number = 1;

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
      this.getLocationById
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

  getLocations = (req: Request, res: Response): void => {
    res.status(200).send(locations).json();
  };

  getLocationById = (req: Request, res: Response): Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let id: string = req.params.id;
    let item: Location | undefined = locations.find(
      (x: Location) => x.id == parseInt(id)
    );
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).send(item);
  };

  generateLocation = (req: Request, res: Response): Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let location: Location = {
      id: ++temp,
      floor: req.body.floor,
      room_number: req.body.room_number,
      build_number: req.body.build_number,
      entry: req.body.room_number,
    };
    locations.push(location);
    return res.status(200).send(location).json();
  };

  patchLocation = (req: Request, res: Response): Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    let item: Location | undefined = locations.find(
      (x: Location) => x.id == parseInt(id)
    );
    if (!item) {
      return res.status(404).json({ error: 'Not found' });
    }
    let { floor, room_number, build_number, entry } = req.body;
    item.floor = floor;
    item.room_number = room_number;
    item.build_number = build_number;
    item.entry = entry;

    return res.status(200).send(item);
  };

  deleteLocation = (req: Request, res: Response): Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    locations = locations.filter((x: Location) => {
      return x.id !== parseInt(id);
    });

    return res.status(200).json();
  };
}

export default LocationController;
