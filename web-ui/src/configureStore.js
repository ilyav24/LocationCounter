import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "./reducers";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import { fromJS } from "immutable";
import authorizationMiddleware from "./containers/Auth/authorizationMiddleware";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, authorizationMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    createRootReducer(history),
    fromJS(preloadedState),
    composedEnhancers
  );

  rootSaga.forEach((saga) => sagaMiddleware.run(saga));

  return store;
}
