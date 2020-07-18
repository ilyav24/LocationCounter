import App from './app';
import LocationController from './api/location';
import BuildingContoller from './api/building';
import SensorContoller from './api/sensor';
const app = new App([new LocationController, new BuildingContoller(), new SensorContoller], 5000);

app.listen();
export = app;
