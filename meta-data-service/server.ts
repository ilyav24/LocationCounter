import App from "./app";
import LocationController from "./api/location";

const app = new App([new LocationController()], 5000);

app.listen();
