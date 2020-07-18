import { Pool } from 'pg';
import {
  qGetCountBetweenDaysBase,
  qGetCountBetweenDays,
  qGetCountBetweenDaysFrom,
  qGetCountBetweenDaysTo,
} from './strat-queries';

import * as dotenv from 'dotenv';
import { SensorBase } from '../sensor/sensor-base';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getCountBetweenDaysDb(
  sensor: SensorBase,
  sensorId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDays, [
          sensor.from,
          sensor.to,
          sensorId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      return (await pool.query(qGetCountBetweenDaysBase, [sensorId])).rows;
    }
    if (sensor.from !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysFrom, [sensor.from, sensorId])
      ).rows;
    }
    if (sensor.to !== undefined) {
      return (await pool.query(qGetCountBetweenDaysTo, [sensor.to, sensorId]))
        .rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
