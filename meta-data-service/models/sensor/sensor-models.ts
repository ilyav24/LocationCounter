import { Pool } from 'pg';
import { qGetAllSsensors, qGetSensorById, qGetAllSensorsEvent } from './sensor-queries';

import * as dotenv from 'dotenv';
import { SensorDate } from './sensor-date';

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

export async function getAllSensorsEventDb(date: SensorDate) {
  try {
    return (await pool.query(qGetAllSensorsEvent, [date.from, date.to])).rows;
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
