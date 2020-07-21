import { Pool } from 'pg';
import {
  getAllLocationQuery,
  insertLocationQuery,
  deleteLocationQuery,
  updateLocationQuery,
  getLocationByIdQuery,
} from './location-queries';
import { Location } from './location';

import * as dotenv from 'dotenv';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';
const databaseName = 'location_counter';

const pool = new Pool({
  connectionString: connectionString + '/' + databaseName,
});

export async function getAllLocations() {
  try {
    return (await pool.query(getAllLocationQuery)).rows;
  } catch (err) {
    throw err;
  }
}

export async function insertLocation(location: Location) {
  try {
    return (
      await pool.query(insertLocationQuery, [
        location.building_id,
        location.name,
        location.floor,
        location.room_num,
        location.entry,
      ])
    ).rows;
  } catch (err) {
    throw err;
  }
}

export async function deleteLocation(id: string) {
  try {
    return (await pool.query(deleteLocationQuery, [id])).rows;
  } catch (err) {
    throw err;
  }
}

export async function updateLocation(location: Location) {
  try {
    return (
      await pool.query(updateLocationQuery, [
        location.id,
        location.name,
        location.floor,
        location.room_num,
        location.entry,
      ])
    ).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getLocationById(id: string) {
  try {
    return (await pool.query(getLocationByIdQuery, [id])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
