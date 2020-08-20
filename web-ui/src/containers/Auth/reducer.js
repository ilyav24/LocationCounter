import {
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    LOCAL_STORAGE_SET_TOKEN,
    AUTHORIZATION_REQUEST,
    AUTHORIZATION_FAILED,
    AUTHORIZATION_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
} from "./constants";

const initialState = {
    token: null,
    userInfo: {},
    error: null,
    isLoading: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATION_SUCCESS:
            localStorage.setItem("lc_token", action.payload.token);
            return {
                ...state,
                error: null,
                token: action.payload.token,
                userInfo: action.payload.userInfo,
            };
        case AUTHENTICATION_FAILED:
            return { ...state, error: action.error };
        case LOCAL_STORAGE_SET_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case AUTHORIZATION_FAILED:
            localStorage.removeItem("lc_token");
            return {
                ...state,
                token: null,
                isLoading: false,
            };
        case AUTHORIZATION_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case AUTHORIZATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem("lc_token");
            return {
                ...state,
                token: null,
                error: null,
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}
