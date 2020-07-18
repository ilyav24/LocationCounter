import { Pool } from 'pg';
import {
  qGetCountBetweenDaysBaseBySensorId,
  qGetCountBetweenDaysBySensorId,
  qGetCountBetweenDaysFromBySensorId,
  qGetCountBetweenDaysToBySensorId,
  qGetCountBetweenDaysByLocationId,
  qGetCountBetweenDaysBaseByLocationId,
  qGetCountBetweenDaysFromByLocationId,
  qGetCountBetweenDaysToByLocationId,
} from './strat-queries';

import * as dotenv from 'dotenv';
import { MyDate } from '../sensor/my-date';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getCountBetweenDaysBySensorIdDb(
  sensor: MyDate,
  sensorId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysBySensorId, [
          sensor.from,
          sensor.to,
          sensorId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      return (await pool.query(qGetCountBetweenDaysBaseBySensorId, [sensorId]))
        .rows;
    }
    if (sensor.from !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysFromBySensorId, [
          sensor.from,
          sensorId,
        ])
      ).rows;
    }
    if (sensor.to !== undefined) {
      return (
        await pool.query(qGetCountBetweenDaysToBySensorId, [
          sensor.to,
          sensorId,
        ])
      ).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCountBetweenDaysByLocationIdDb(
  sensor: MyDate,
  locationId: number
) {
  try {
    if (sensor.from !== undefined && sensor.to !== undefined) {
      console.log(qGetCountBetweenDaysByLocationId);
      return (
        await pool.query(qGetCountBetweenDaysByLocationId, [
          sensor.from,
          sensor.to,
          locationId,
        ])
      ).rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      console.log(qGetCountBetweenDaysBaseByLocationId);

      return (
        await pool.query(qGetCountBetweenDaysBaseByLocationId, [locationId])
      ).rows;
    }
    if (sensor.from !== undefined) {
      console.log(qGetCountBetweenDaysFromByLocationId);

      return (
        await pool.query(qGetCountBetweenDaysFromByLocationId, [
          sensor.from,
          locationId,
        ])
      ).rows;
    }
    if (sensor.to !== undefined) {
      console.log(qGetCountBetweenDaysToByLocationId);
      return (
        await pool.query(qGetCountBetweenDaysToByLocationId, [
          sensor.to,
          locationId,
        ])
      ).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
