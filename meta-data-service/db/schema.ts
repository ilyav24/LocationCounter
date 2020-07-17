export const createDatabase = `CREATE DATABASE location_counter;`;

export const dropDataBase = `DROP DATABASE IF EXISTS location_counter;`;

export const sensorTable = `CREATE TABLE public.sensors(
    id INTEGER NOT NULL PRIMARY KEY,
    info TEXT NULL
    );`;

export const statusTable = `CREATE TABLE public.status(
id SERIAL NOT NULL PRIMARY KEY,
status TEXT NOT NULL
);`;

export const sensorStatusTable = `CREATE TABLE public.sensors_status(
sensor_id INTEGER NOT NULL REFERENCES sensors(id),
status_id INTEGER NOT NULL REFERENCES status(id),
PRIMARY KEY(sensor_id,status_id)
);`;

export const userTypeTable = `CREATE TABLE public.user_type (
id SERIAL NOT NULL PRIMARY KEY,
type TEXT NOT NULL
);`;

export const usersTable = `CREATE TABLE public.users (
id SERIAL NOT NULL PRIMARY KEY,
user_name TEXT NOT NULL,
email TEXT NOT NULL,
type_id INTEGER REFERENCES user_type(id)
);`;

export const userPassTable = `CREATE TABLE public.user_pass (
id INTEGER REFERENCES users(id),
pass TEXT NOT NULL,
update_last_date timestamp NOT NULL default CURRENT_TIMESTAMP
);`;

export const buildingTable = `CREATE TABLE public.building(
id SERIAL NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
number_of_floors INTEGER NOT NULL,
capacity INTEGER NOT NULL
);`;

export const locationTable = `CREATE TABLE public.location(
id SERIAL NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
building_id INTEGER NOT NULL REFERENCES building(id),
floor INTEGER NOT NULL,
room_num INTEGER NULL,
entry INTEGER NULL
);`;

export const sensorLocationTable = `CREATE TABLE public.sensor_location(
id SERIAL NOT NULL PRIMARY KEY,
location_id INTEGER REFERENCES location(id),
sensors_id INTEGER REFERENCES location(id)
);`;

export const usagesTable = `CREATE TABLE public.usages(
sensosr_id INTEGER NOT NULL PRIMARY KEY,
last_sync TIMESTAMP NOT NULL DEFAULT NOW(),
is_entered BIT NULL
);`;

export const dropSchema = `DROP DATABASE location_counter;`;
