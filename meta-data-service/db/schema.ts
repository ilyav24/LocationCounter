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
user_type INTEGER REFERENCES user_type(id)
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
sensor_id INTEGER NOT NULL REFERENCES sensors(id),
height INTEGER NOT NULL DEFAULT 0,
last_sync TIMESTAMP NOT NULL DEFAULT NOW(),
is_entered BIT NULL
);`;

export const summedByMinuteTable = `CREATE TABLE public.summedByMinute(
sensor_id INTEGER NOT NULL REFERENCES sensors(id),
date TEXT NOT NULL,
minute INTEGER DEFAULT 0
);`;

export const summedByHourTable = `CREATE TABLE public.summedByHour(
sensor_id INTEGER NOT NULL REFERENCES sensors(id),
date TEXT NOT NULL,
hour INTEGER DEFAULT 0
);`;

export const summedByDayTable = `CREATE TABLE public.summedByDay(
sensor_id INTEGER NOT NULL REFERENCES sensors(id),
date TEXT NOT NULL,
day INTEGER DEFAULT 0
);`;

export const dropSchema = `DROP DATABASE location_counter;`;