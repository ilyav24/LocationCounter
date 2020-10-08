import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import { wrap } from '../util/wrapper';
import { MyDate } from '../models/sensor/my-date';
import {
  getCountBetweenDaysBySensorIdDb,
  getCountBetweenDaysByLocationIdDb,
  getCountBetweenDaysByBuildingIdDb,
  ReturnNumOfRowsBetweenDatesDb,
  ReturnCountBetweenDatesMinuteDb,
  ReturnCountBetweenDatesDayDb,
  ReturnCountBetweenDatesHourDb,
  ReturnNumOfRowsBetweenDatesByBuildingIdDb,
  ReturnNumOfRowsBetweenDatesByLocationIdDb,
  ReturnCountBetweenDatesByBuildingIdDayDb,
  ReturnCountBetweenDatesByBuildingIdHourDb,
  ReturnCountBetweenDatesByBuildingIdMinuteDb,
  ReturnCountBetweenDatesByLocationIdDayDb,
  ReturnCountBetweenDatesByLocationIdHourDb,
  ReturnCountBetweenDatesByLocationIdMinuteDb
} from '../models/stats/strat-models';
import { SensoreUsage } from '../models/stats/sensor-usage';
import { SumCount } from '../models/stats/sum-count';
import { dateSorter } from '../util/sorter';

class StratController extends Controller {
  public path = '/stats';
  public idPrefix: string = '/:id';

  private id: string = 'id';
  constructor() {
    super();
    this.initializeRoutes();
  }

  private calculateAmout(results: any[]): SensoreUsage[] {
    let inside = 0,
      outside = 0,
      total = 0;
    if (results.length > 0) {
      if (results[0].is_entered == '0') {
        outside = +results[0].total;
        inside = +results[1].total;
      } else {
        outside = +results[1].total;
        inside = +results[0].total;
      }
    }
    total = inside - outside;
    const r: SensoreUsage[] = [];
    r.push(new SensoreUsage(total));
    return r;
  }
  public initializeRoutes(): void {
    this.router.post(
      this.path + '/location' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getCountBetweenDaysByLocationId
    );


    this.router.post(
      this.path + '/sensor' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getCountBetweenDaysBySensorId
    );



    this.router.post(
      this.path + '/building' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getCountBetweenDaysByBuildingId
    );


    this.router.post(
      this.path + '/minute/sensor',
      this.ReturnCountBetweenDatesMinute
    );

    this.router.post(
      this.path + '/hour/sensor',
      this.ReturnCountBetweenDatesHour
    );

    this.router.post(
      this.path + '/day/sensor',
      this.ReturnCountBetweenDatesDay
    );

    this.router.post(
      this.path + '/minute/location' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByLocationIdMinute
    );

    this.router.post(
      this.path + '/hour/location' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByLocationIdHour
    );

    this.router.post(
      this.path + '/day/location' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByLocationIdDay
    );

    this.router.post(
      this.path + '/minute/building' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByBuildingIdMinute
    );

    this.router.post(
      this.path + '/hour/building' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByBuildingIdHour
    );

    this.router.post(
      this.path + '/day/building' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.ReturnCountBetweenDatesByBuildingIdDay
    );

  }

  getCountBetweenDaysBySensorId = async (
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
      let results: any = await getCountBetweenDaysBySensorIdDb(date, id);
      const r: SensoreUsage[] = this.calculateAmout(results);

      return res.status(200).json(wrap(r));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  getCountBetweenDaysByLocationId = async (
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
      let results: any = await getCountBetweenDaysByLocationIdDb(date, id);

      const r: SensoreUsage[] = this.calculateAmout(results);
      return res.status(200).json(wrap(r));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };


  getCountBetweenDaysByBuildingId = async (
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
      let results: any = await getCountBetweenDaysByBuildingIdDb(date, id);
      const r: SensoreUsage[] = this.calculateAmout(results);
      return res.status(200).json(wrap(r));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };



  ReturnCountBetweenDatesMinute = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const from: any = req.body.from
      const to: any = req.body.to
      const data = await ReturnNumOfRowsBetweenDatesDb(from, to, 'minute');
      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesMinuteDb(
          from, to
        );

        responseArr.push(result[index]);
      }

      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesHour = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesDb(from, to, 'hour');

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesHourDb(
          from, to
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesDay = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesDb(from, to, 'day');

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesDayDb(
          from, to
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ///////Location

  ReturnCountBetweenDatesByLocationIdMinute = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to
      const data = await ReturnNumOfRowsBetweenDatesByLocationIdDb(from, to, 'minute', id);
      let responseArr: SumCount[] = [];
      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByLocationIdMinuteDb(
          from, to, id
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesByLocationIdHour = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesByLocationIdDb(from, to, 'hour', id);

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByLocationIdHourDb(
          from, to, id
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesByLocationIdDay = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesByLocationIdDb(from, to, 'day', id);

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByLocationIdDayDb(
          from, to, id
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };


  //////Building

  ReturnCountBetweenDatesByBuildingIdMinute = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to
      const data = await ReturnNumOfRowsBetweenDatesByBuildingIdDb(from, to, 'minute', id);
      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByBuildingIdMinuteDb(
          from, to, id
        );

        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesByBuildingIdHour = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesByBuildingIdDb(from, to, 'hour', id);

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByBuildingIdHourDb(
          from, to, id
        );
        responseArr.push(result[index]);
      }
      responseArr.sort(dateSorter)
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };

  ReturnCountBetweenDatesByBuildingIdDay = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      //const date: MyDate = req.body;
      const id = +req.params.id;
      const from: any = req.body.from
      const to: any = req.body.to

      const data = await ReturnNumOfRowsBetweenDatesByBuildingIdDb(from, to, 'day', id);

      let responseArr: SumCount[] = [];

      for (let index = 0; index < data[0].count; index++) {

        const result = await ReturnCountBetweenDatesByBuildingIdDayDb(
          from, to, id
        );
        responseArr.push(result[index]);
      }
      return res.status(200).json(wrap(responseArr));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };


}





export default StratController;
