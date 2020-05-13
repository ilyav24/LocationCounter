import { Pool } from 'pg';
import { getAllBuildingQuery, insertBuildingQuery } from './building-queries';
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
    console.log(err);
    pool.end();
  }
}

export async function insertBuilding(building: Building) {
  try {
    return (
      await pool.query(insertBuildingQuery, [
        building.name,
        building.num_of_floors,
      ])
    ).rows;
  } catch (err) {
    console.log(err);
    pool.end();
  }
}
