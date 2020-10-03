import App from './app';
import LocationController from './api/location';
import BuildingController from './api/building';
import SensorController from './api/sensor';
import StratController from './api/stats';
import UserController from './api/users';
import {
  GetCountAggregatedMinuteDb,
  GetCountAggregatedHourDb,
  GetCountAggregatedDayDb
} from './models/stats/strat-models';

import pkg from 'node-cron';
const { schedule } = pkg;

const app = new App(
  [
    new LocationController(),
    new BuildingController(),
    new SensorController(),
    new StratController(),
    new UserController(),
  ],
  5000
);

schedule(" */1 * * * * ",function(){
  console.log("Scheduler running. . .")
  GetCountAggregatedMinuteDb();
});

schedule(" 0 * * * * ",function(){
  console.log("Scheduler running. . .")
  GetCountAggregatedHourDb();
});

schedule(" 0 0 * * * ",function(){
  console.log("Scheduler running. . .")
  GetCountAggregatedDayDb();
});

app.listen();

export = app;
