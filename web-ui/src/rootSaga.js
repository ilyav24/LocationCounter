import rootBuildingsSaga from "./containers/Buildings/sagas";
import saveBuildingRootSaga from "./containers/BuildingCardContainer/sagas";
import locationsRootSaga from "./containers/Locations/sagas";

export default [
  ...rootBuildingsSaga,
  ...saveBuildingRootSaga,
  ...locationsRootSaga,
];
