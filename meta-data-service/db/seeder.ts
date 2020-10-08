import { Pool, Client } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const user: String | undefined = process.env.DB_USER;
const password: String | undefined = process.env.DB_PASS;

const connectionString =
  'postgres://' + user + ':' + password + '@localhost:5432';

const databaseName = 'location_counter';

async function createData() {
  const client = new Client({
    connectionString: connectionString + '/' + databaseName,
  });
  try {
    await client.connect();
    console.log('+++++ connected to database');
    console.log('+++++ creating buildings and locations');
    for (let i = 1; i < 11; i++) {
      await client.query(
        `INSERT INTO building (name, number_of_floors, capacity) VALUES ('Seed Table ${i}', ${i}, ${i * 100
        });`
      );
      for (let j = 1; j < 6; j++) {
        await client.query(
          `INSERT INTO location (building_id,name, floor, room_num, entry) VALUES (${i}, 'Location ${j} Building ${i}' , ${j}, ${j * 10
          }, ${i})`
        );
      }
    }
    console.log('+++++ creating sensors');
    for (let i = 1; i < 11; i++) {
      await client.query(`INSERT INTO sensors VALUES (${i})`);
    }
    console.log('+++++ creating sensors locations');
    for (let i = 1; i < 6; i++) {
      await client.query(
        `INSERT INTO public.sensor_location(location_id, sensors_id) VALUES (${i}, ${i})`
      );
    }
    for (let i = 6; i < 11; i++) {
      await client.query(
        `INSERT INTO public.sensor_location(sensors_id) VALUES (${i})`
      );
    }
    console.log('+++++ creating statuses');
    await client.query(
      `INSERT INTO public.status(id, status)VALUES (1, 'ONLINE')`
    );
    await client.query(
      `INSERT INTO public.status(id, status)VALUES (2, 'OFFLINE')`
    );
    await client.query(
      `INSERT INTO public.status(id, status)VALUES (3, 'UNKNOWN')`
    );
    console.log('+++++ creating sensors status');
    for (let i = 1; i < 11; i++) {
      await client.query(
        `INSERT INTO sensors_status(sensor_id,status_id) VALUES (${i},${Math.floor(Math.random() * 3) + 1
        })`
      );
    }
    console.log('+++++ creating usages');
    for (let i = 0; i < 100; i++) {
      let is_entered = i < 50 ? 1 : Math.round(Math.random());
      await client.query(
        `INSERT INTO public.usages(sensor_id,height,last_sync, is_entered) VALUES (${Math.floor(Math.random() * 10) + 1
        },${100},to_timestamp(${Date.now() - 1000 * i
        } / 1000.0), ${is_entered}::bit);`
      );
    }
    for (let i = 0; i < 100; i++) {
      let is_entered = i < 50 ? 1 : Math.round(Math.random());
      await client.query(
        `INSERT INTO public.usages(sensor_id,height,last_sync, is_entered) VALUES (${Math.floor(Math.random() * 10) + 1
        },${100},to_timestamp(${Date.now() - 1000 * i * i
        } / 1000.0), ${is_entered}::bit);`
      );
    }
    console.log('+++++ creating user types');
    await client.query(`INSERT INTO public.user_type(type) VALUES ('USER')`);
    await client.query(`INSERT INTO public.user_type(type) VALUES ('ADMIN')`);

    console.log('+++++ creating user');
    await client.query(`INSERT INTO public.users(user_name, email, pass, user_type)VALUES ('admin_user', 'admin_user@lc.com', 'locationcounter', 2);`);
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}

export { createData };
require('make-runnable/custom')({
  printOutputFrame: false,
});
