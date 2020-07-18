import App from './app';
import LocationController from './api/location';
import BuildingContoller from './api/building';
import SensorContoller from './api/sensor';
import StratContoller from './api/stats';
const app = new App([new LocationController, new BuildingContoller(), new SensorContoller, new StratContoller()], 5000);

app.listen();
export = app;
