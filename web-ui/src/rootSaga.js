import rootBuildingsSaga from "./containers/Buildings/sagas";
import saveBuildingRootSaga from "./containers/BuildingCardContainer/sagas";
import locationsRootSaga from "./containers/Locations/sagas";
import sensorsRootSaga from "./containers/Sensors/sagas";

export default [
  ...rootBuildingsSaga,
  ...saveBuildingRootSaga,
  ...locationsRootSaga,
  ...sensorsRootSaga,
];
