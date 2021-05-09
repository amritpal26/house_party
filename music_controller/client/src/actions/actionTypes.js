const authActions = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT: 'LOGOUT',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS', 
    SIGNUP_FAIL: 'SIGNUP_FAIL', 
    ACTIVATION_SUCCESS: 'ACTIVATION_SUCCESS',
    ACTIVATION_FAIL: 'ACTIVATION_FAIL',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAIL: 'AUTHENTICATION_FAIL',
    USER_LOAD_SUCCESS: 'USER_LOAD_SUCCESS',
    USER_LOAD_FAIL: 'USER_LOAD_FAIL',
    PASSWORD_RESET_FAIL: 'PASSWORD_RESET_FAIL',
    PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS',
    PASSWORD_RESET_CONFIRM_FAIL: 'PASSWORD_RESET_CONFIRM_FAIL',
    PASSWORD_RESET_CONFIRM_SUCCESS: 'PASSWORD_RESET_CONFIRM_SUCCESS',
    GOOGLE_AUTH_SUCCESS: 'GOOGLE_AUTH_SUCCESS',
    GOOGLE_AUTH_FAIL: 'GOOGLE_AUTH_FAIL',
    FACEBOOK_AUTH_SUCCESS: 'FACEBOOK_AUTH_SUCCESS',
    FACEBOOK_AUTH_FAIL: 'FACEBOOK_AUTH_FAIL',
}

const alertActions = {
    SHOW_ERROR: 'SHOW_ERROR',
    HIDE_ERROR: 'HIDE_ERROR',
    SHOW_SUCCESS: 'SHOW_SUCCESS',
    HIDE_SUCCESS: 'HIDE_SUCCESS'
}

const roomActions = {
    CREATE_ROOM_SUCCESS: 'CREATE_ROOM_SUCCESS',
    CREATE_ROOM_FAILURE: 'CREATE_ROOM_FAIL',
    JOIN_ROOM_SUCCESS: 'JOIN_ROOM_SUCCESS',
    JOIN_ROOM_FAILURE: 'JOIN_ROOM_FAILURE',
    GET_ROOM_SUCCESS: 'GET_ROOM_SUCCESS',
    GET_ROOM_FAILURE: 'GET_ROOM_FAILURE',
    UPDATE_ROOM_SUCCESS: 'UPDATE_ROOM_SUCCESS',
    UPDATE_ROOM_FAILURE: 'UPDATE_ROOM_FAILURE',
    LEAVE_ROOM_SUCCESS: 'LEAVE_ROOM_SUCCESS',
    LEAVE_ROOM_FAILURE: 'LEAVE_ROOM_FAILURE',
}

const ActionTypes = {
    authActions: authActions,
    alertActions: alertActions,
    roomActions: roomActions,
};

export default ActionTypes;