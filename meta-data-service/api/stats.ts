import Controller from './controller';
import { Response } from 'express';
import { Request } from 'express';
import { param, check, validationResult } from 'express-validator';
import { wrap } from '../util/wrapper';
import { SensorBase } from '../models/sensor/sensor-base';
import { getCountBetweenDaysDb } from '../models/strat/strat-models';
import { SensoreUsage } from '../models/strat/sensor-usage';

class StratContoller extends Controller {
  public path = '/strat';
  public idPrefix: string = '/:id';

  private id: string = 'id';
  constructor() {
    super();
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    // get all sensors
    this.router.post(
      this.path + '/sensor' + this.idPrefix,
      [param(this.id).isNumeric()],
      this.getCountBetweenDays
    );
  }

  getCountBetweenDays = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const date: SensorBase = req.body;
    const id = +req.params.id;
   
    try {
      let results: any = await getCountBetweenDaysDb(date, id);

      let inside = 0,
        outside = 0;

      if (results[0].is_entered == '0') {
        outside = +results[0].total;
        inside = +results[1].total;
      } else {
        outside = +results[1].total;
        inside = +results[0].total;
      }

      const total = inside - outside;
      const r: SensoreUsage[] = [];
      r.push(new SensoreUsage(total));
      return res.status(200).json(wrap(r));
    } catch (err) {
      return res.status(500).json({ errors: err.detail });
    }
  };
}

export default StratContoller;
