import {
  REFRESH_MODEL_REQUEST,
  REFRESH_MODEL_SUCCESS,
  REFRESH_MODEL_FAILED,
  SETUP_IFRAME_REF,
} from "./constants";

const initialState = {
  isLoading: true,
  error: null,
  iframeRef: null,
};

export default function building3DgModelReducers(state = initialState, action) {
  switch (action.type) {
    case REFRESH_MODEL_REQUEST:
      return { ...state, isLoading: true };
    case REFRESH_MODEL_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case REFRESH_MODEL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SETUP_IFRAME_REF:
      return { ...state, iframeRef: action.iframeRef };
    default:
      return state;
  }
}
