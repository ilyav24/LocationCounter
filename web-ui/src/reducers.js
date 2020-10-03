import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import buildingsReducer from "./containers/Buildings/reducer";
import buildingsCardReducer from "./containers/BuildingCardContainer/reducer";
import locationReducer from "./containers/Locations/reducer";
import sensorReducer from "./containers/Sensors/reducer";
import usersReducer from "./containers/Users/reducer";
import authReducer from "./containers/Auth/reducer";
import building3DgModelReducers from "./containers/Building3DModelContainer/reducer";

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        buildingsList: buildingsReducer,
        buildingCard: buildingsCardReducer,
        locationList: locationReducer,
        sensorsList: sensorReducer,
        usersList: usersReducer,
        auth: authReducer,
        building3DModel: building3DgModelReducers
    });

export default createRootReducer;
