import { Pool } from 'pg';
import {
  qGetAllSsensors,
  qGetSensorById,
  qGetAllSensorsEvent,
  qGetAllSensorsEventById,
  qUpdateLocationByID,
  qGetCountBetweenDaysBase,
  qGetCountBetweenDays,
  qGetCountBetweenDaysFrom,
  qGetCountBetweenDaysTo,
} from './sensor-queries';

import * as dotenv from 'dotenv';
import { SensorBase } from './sensor-base';
import { SensorDate } from './sensor-date';
import { SensorLocation } from './sensor-location';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getAllSsensorsDb() {
  try {
    return (await pool.query(qGetAllSsensors)).rows;
  } catch (err) {
    throw err;
  }
}

export async function getSensorByIdDb(id: string) {
  try {
    return (await pool.query(qGetSensorById, [id])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAllSensorsEventDb(date: SensorBase) {
  try {
    return (await pool.query(qGetAllSensorsEvent, [date.from, date.to])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAllSensorsEventByIdDb(date: SensorDate) {
  try {
    return (
      await pool.query(qGetAllSensorsEventById, [
        date.from,
        date.to,
        date.sensor_id,
      ])
    ).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateLocationDb(locationId: number, sensorId: number) {
  try {
    await pool.query(qUpdateLocationByID, [locationId, sensorId]);
    return getSensorByIdDb(sensorId.toString());
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function getCountBetweenDaysDb(sensor: SensorBase) {
  try {
    // const undefined = 'undefined';

    if (sensor.from !== undefined && sensor.to !== undefined) {
      console.log(qGetCountBetweenDays);
      return (await pool.query(qGetCountBetweenDays, [sensor.from, sensor.to]))
        .rows;
    }
    if (sensor.from === undefined && sensor.to === undefined) {
      console.log(qGetCountBetweenDaysBase);
      return (await pool.query(qGetCountBetweenDaysBase)).rows;
    }
    if (sensor.from !== undefined ) {
      console.log(qGetCountBetweenDaysFrom);
      return (await pool.query(qGetCountBetweenDaysFrom, [sensor.from])).rows;
    }
    if (sensor.to !== undefined) {
      console.log(qGetCountBetweenDaysTo);
      return (await pool.query(qGetCountBetweenDaysTo, [sensor.to])).rows;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// export async function insertBuilding(building: Building) {
//   try {
//     return (
//       await pool.query(insertBuildingQuery, [
//         building.name,
//         building.number_of_floors,
//         building.capacity,
//       ])
//     ).rows;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function deleteBuilding(id: string) {
//   try {
//     let res = (await pool.query(deleteAllLocationsAndBuilding, [id])).rows;
//     await pool.query(deleteBuildingQuery, [id]);
//     return res.length;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// export async function updateBuilding(building: Building) {
//   try {
//     return (
//       await pool.query(updateBuildingQuery, [
//         building.id,
//         building.name,
//         building.number_of_floors,
//         building.capacity,
//       ])
//     ).rows;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// export async function getBuildingById(id: string) {
//   try {
//     return (await pool.query(getBuildingByIdQuery, [id])).rows;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }
