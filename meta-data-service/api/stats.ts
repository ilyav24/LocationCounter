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
} from '../models/stats/strat-models';
import { SensoreUsage } from '../models/stats/sensor-usage';
import { log } from 'console';

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
}

export default StratController;
