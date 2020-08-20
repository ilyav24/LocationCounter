import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    LOCAL_STORAGE_SET_TOKEN,
    AUTHORIZATION_FAILED,
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
} from "./constants";

export const authenticationRequest = (credentials) => {
    return {
        type: AUTHENTICATION_REQUEST,
        credentials,
    };
};

export const authenticationSuccess = (payload) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        payload,
    };
};

export const authenticationFailed = (error) => {
    return {
        type: AUTHENTICATION_FAILED,
        error,
    };
};

export const localStorageSetToken = (token) => {
    return {
        type: LOCAL_STORAGE_SET_TOKEN,
        token,
    };
};

export const authorizationRequest = (token) => {
    return {
        type: AUTHORIZATION_REQUEST,
        token,
    };
};

export const authorizationFailed = () => {
    return {
        type: AUTHORIZATION_FAILED,
    };
};

export const authorizationSuccess = () => {
    return {
        type: AUTHORIZATION_SUCCESS,
    };
};

export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST,
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

export const logoutFailed = (error) => {
    return {
        type: LOGOUT_FAILED,
        error,
    };
};
