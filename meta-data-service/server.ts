import App from './app';
import LocationController from './api/location';
import BuildingController from './api/building';
import SensorController from './api/sensor';
import StratController from './api/stats';
const app = new App([new LocationController, new BuildingController(), new SensorController, new StratController()], 5000);

app.listen();
export = app;
