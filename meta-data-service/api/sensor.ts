import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import { wrap } from '../util/wrapper';
import { MyDate } from '../models/sensor/my-date';
import { SensorDate } from '../models/sensor/sensor-date';
import {
  getAllSsensorsDb,
  getSensorByIdDb,
  getAllSensorsEventDb,
  getAllSensorsEventByIdDb,
  updateLocationDb,
  getAllSensorsEventDb1,
  insertEventDb,
  getDailyEventsFromDatabase, insertNewSensor
} from '../models/sensor/sensor-models';
import { SensorLocation } from '../models/sensor/sensor-location';
import { SensoreUsage } from '../models/stats/sensor-usage';

class SensorController extends Controller {
  public path = '/sensor';
  public idPrefix: string = '/:id';

  private id: string = 'id';
  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    // get all sensors
    this.router.get(
      this.path + '/event',
      this.getAllSensorsEvent1
    );

    this.router.get(this.path, this.getAllSsensors);
    this.router.get(
      this.path + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getSensorById
    );


    this.router.post(
      this.path + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getAllSensorsEvent
    );

    this.router.post(
      this.path + '/event' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getAllSensorsEventById
    );

    this.router.patch(
      this.path + '/UpdateLocation',
      [check('data').isArray()],
      this.updateLocation
    );

    this.router.post(
      '/new/event',
      this.insertEvent
    );

    this.router.post(
      '/new' + this.path,
      this.insertSensor
    );

    this.router.get(
      '/daily' + this.path,
      this.getDailyEvents
    );
  }

  getAllSsensors = async (req: Request, res: Response) => {
    try {
      const sensors = await getAllSsensorsDb();
      return res.json(wrap(sensors));
    } catch (err) {
      res.status(500).json({ errors: err.detail });
    }
  };

  getSensorById = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let id: string = req.params.id;
    try {
      let results = await getSensorByIdDb(id);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getAllSensorsEvent1 = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);
    if (!(errors.isEmpty())) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      let results = await getAllSensorsEventDb1();
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getAllSensorsEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const date: MyDate = req.body;
    const id = +req.params.id;
    try {
      let results = await getAllSensorsEventDb(date, id);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getDailyEvents = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      let results = await getDailyEventsFromDatabase();
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getAllSensorsEventById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const date: SensorDate = req.body;
    const id = +req.params.id;
    try {
      let results = await getAllSensorsEventByIdDb(date, id);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  updateLocation = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    const data: SensorLocation[] = req.body.data;
    try {
      let responseArr: SensorLocation[] = [];

      for (let index = 0; index < data.length; index++) {
        const result = await updateLocationDb(
          data[index].location,
          data[index].sensor_id
        );
        responseArr.push(result[0]);
      }

      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  insertEvent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const is_entered = +req.body.people;
    const SensorID = +req.body.SensorID;
    const Height = +req.body.Height;
    const date = req.body.Date;
    try {
      let results = await insertEventDb(is_entered, SensorID, Height, date);
      return res.status(200).json(wrap(results));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  insertSensor = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = await insertNewSensor()
      return res.status(200).json({ id })
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  }


}



export default SensorController;
