import {
  REFRESH_MODEL_FAILED,
  REFRESH_MODEL_REQUEST,
  REFRESH_MODEL_SUCCESS,
  SETUP_IFRAME_REF,
} from "./constants";

export const modelRefreshRequest = () => {
  return {
    type: REFRESH_MODEL_REQUEST,
  };
};

export const modelRefreshSuccess = () => {
  return {
    type: REFRESH_MODEL_SUCCESS,
  };
};

export const modelRefreshFailed = (error) => {
  return {
    type: REFRESH_MODEL_FAILED,
    error,
  };
};

export const setupIframeRef = (iframeRef) => {
  return {
    type: SETUP_IFRAME_REF,
    iframeRef,
  };
};
