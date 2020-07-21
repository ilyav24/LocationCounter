import { Pool } from 'pg';
import {
  getAllBuildingQuery,
  insertBuildingQuery,
  deleteBuildingQuery,
  deleteAllLocationsAndBuilding,
  updateBuildingQuery,
  getBuildingByIdQuery,
  getBuildingLocations,
} from './building-queries';
import { Building } from './building';

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

export async function getAllBuildings() {
  try {
    return (await pool.query(getAllBuildingQuery)).rows;
  } catch (err) {
    throw err;
  }
}

export async function insertBuilding(building: Building) {
  try {
    return (
      await pool.query(insertBuildingQuery, [
        building.name,
        building.number_of_floors,
        building.capacity,
      ])
    ).rows;
  } catch (err) {
    throw err;
  }
}

export async function deleteBuilding(id: string) {
  try {
    let res = (await pool.query(deleteAllLocationsAndBuilding, [id])).rows;
    await pool.query(deleteBuildingQuery, [id]);
    return res.length;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateBuilding(building: Building) {
  try {
    return (
      await pool.query(updateBuildingQuery, [
        building.id,
        building.name,
        building.number_of_floors,
        building.capacity,
      ])
    ).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getBuildingById(id: string) {
  try {
    return (await pool.query(getBuildingByIdQuery, [id])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAllBuildingsLocations(id: string) {
  try {
    return (await pool.query(getBuildingLocations, [id])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
