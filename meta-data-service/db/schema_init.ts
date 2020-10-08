import { Pool, Client } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';

const databaseName = 'location_counter';

async function createAllTables() {
  console.log('+++++ running schema creation script');
  console.log(user);
  console.log('+++++ created database');
  const client = new Client({
    connectionString: connectionString,
  });
  try {
    await client.connect();
    console.log('+++++ connected to database');
    await client.query(schema.dropDataBase);
    console.log('+++++ database was successfully created');
    await client.query(schema.createDatabase);
    console.log('+++++ database was successfully created');
    const pool = new Pool({
      connectionString: connectionString + '/' + databaseName,
    });
    try {
      await pool.query(schema.sensorTable);
      console.log('+++++ sensorTable was successfully created');
      await pool.query(schema.statusTable);
      console.log('+++++ statusTable was successfully created');
      await pool.query(schema.sensorStatusTable);
      console.log('+++++ sensorStatusTable was successfully created');
      await pool.query(schema.userTypeTable);
      console.log('+++++ userTypeTable was successfully created');
      await pool.query(schema.usersTable);
      console.log('+++++ usersTable was successfully created');
      await pool.query(schema.buildingTable);
      console.log('+++++ buildingTable was successfully created');
      await pool.query(schema.locationTable);
      console.log('+++++ locationTable was successfully created');
      await pool.query(schema.sensorLocationTable);
      console.log('+++++ sensorLocationTable was successfully created');
      await pool.query(schema.usagesTable);
      console.log('+++++ usagesTable was successfully created');
      await pool.query(schema.summedByMinuteTable);
      console.log('+++++ summedByMinuteTable was successfully created');
      await pool.query(schema.summedByHourTable);
      console.log('+++++ summedByHourTable was successfully created');
      await pool.query(schema.summedByDayTable);
      console.log('+++++ summedByDayTable was successfully created');
    } catch (err) {
      console.log(err);
      console.log('----- database could not be created :(');
    } finally {
      pool.end();
    }
  } catch (err) {
    console.log(err);
    console.log('----- database could not be created :(');
  } finally {
    client.end();
  }
}

async function dropAllTables() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('+++++ connected to database');

    await client.query(schema.dropSchema);
    console.log('+++++ database successfully dropped');
  } catch (err) {
    console.log(err);
    console.log('----- failed to drop database :(');
  } finally {
    client.end();
  }
}

export { dropAllTables, createAllTables };
require('make-runnable/custom')({
  printOutputFrame: false,
});
