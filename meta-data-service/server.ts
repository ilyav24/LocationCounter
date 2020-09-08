import App from './app';
import LocationController from './api/location';
import BuildingController from './api/building';
import SensorController from './api/sensor';
import StratController from './api/stats';
import UserController from './api/users';
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

app.listen();
export = app;