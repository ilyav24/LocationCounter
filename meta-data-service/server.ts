import App from './app';
import LocationController from './api/location';
import BuildingController from './api/building';
import SensorController from './api/sensor';
import StratController from './api/stats';
import UserController from './api/users';
import {
  GetCountAggregatedMinuteDb,
  GetCountAggregatedHourDb,
  GetCountAggregatedDayDb,
  updateSensorStatus
} from './models/stats/strat-models';

import pkg from 'node-cron';
const { schedule } = pkg;

import LoginController from './api/login';
const app = new App(
  [
    new LocationController(),
    new BuildingController(),
    new SensorController(),
    new StratController(),
    new UserController(),
    new LoginController(),
  ],
  5000
);

schedule(" */1 * * * * ", function () {
  console.log("[Minute Job] Updating people in rooms. . .")
  GetCountAggregatedMinuteDb();
});

schedule(" */1 * * * * ", function () {
  console.log("[Sensor Status] Updating sensor statues. . .")
  updateSensorStatus();
});

schedule(" 0 * * * * ", function () {
  console.log("[Hour Job] Updating people in rooms. . .")
  GetCountAggregatedHourDb();
});

schedule(" 0 0 * * * ", function () {
  console.log("[Day Job] Updating people in rooms. . .")
  GetCountAggregatedDayDb();
});

app.listen();


export = app;
