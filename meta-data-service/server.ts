import App from './app';
import LocationController from './api/location';
import BuildingContoller from './api/building';
const app = new App([new LocationController, new BuildingContoller], 5000);

app.listen();
export = app;
