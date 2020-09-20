import { authenticationLogout } from "./actions";

const authorizationMiddleware = (state) => (next) => (action) => {
  const { exp } = state.getState().auth.toJS();
  let nextState;

  if (exp) {
    const currentTime = Date.now() / 1000;

    if (exp <= currentTime) {
      nextState = next(authenticationLogout());
    } else {
      nextState = next(action);
    }
  } else {
    nextState = next(action);
  }

  return nextState;
};

export default authorizationMiddleware;
