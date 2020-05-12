import { Location } from '../models/locations/location';
import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import { getAllLocations, insetLocation } from '../models/locations/location-models';


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
    // this.router.get(
    //   this.path + this.idPrefix,
    //   [param('id').isNumeric()],
    //   this.getLocationById
    // );
    this.router.post(
      this.path,
      [check('floor').isNumeric()],
      this.generateLocation
    );

    // this.router.patch(
    //   this.path + this.idPrefix,
    //   [param('id').isNumeric()],
    //   this.patchLocation
    // );

    // this.router.delete(
    //   this.path + this.idPrefix,
    //   [param('id').isNumeric()],
    //   this.deleteLocation
    // );
  }

  getLocations = async(req: Request, res: Response) => {
    let locations = await getAllLocations();
    res.status(200).send(locations).json();
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

  generateLocation = async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    let location: Location = req.body;
    location.building_id = 1;
    let results = await insetLocation(location);
    return res.status(200).send(results).json();
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

  // deleteLocation = (req: Request, res: Response): Response => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(404).json({ errors: errors.array() });
  //   }
  //   let id: string = req.params.id;
  //   locations = locations.filter((x: Location) => {
  //     return x.id !== parseInt(id);
  //   });

  //   return res.status(200).json();
  // };
}

export default LocationController;
