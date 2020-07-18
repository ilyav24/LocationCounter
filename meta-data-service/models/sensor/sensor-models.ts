import { MyDate } from './my-date';

import {
  qGetAllSsensors,
  qGetSensorById,
  qGetAllSensorsEvent,
  qGetAllSensorsEventById,
  qUpdateLocationByID,
} from './sensor-queries';




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

export async function getAllSensorsEventDb(date: MyDate, sensorId: number) {
  try {
    return (await pool.query(qGetAllSensorsEvent, [date.from, date.to, sensorId])).rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getAllSensorsEventByIdDb(date: MyDate, sensorId:number) {
  try {
    return (
      await pool.query(qGetAllSensorsEventById, [
        date.from,
        date.to,
        sensorId
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
