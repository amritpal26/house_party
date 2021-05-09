import axios from 'axios';
import actionTypes from './actionTypes';

const URL_CREATE_ROOM = '/api/create-room';
const URL_JOIN_ROOM = '/api/join-room';
const URL_GET_ROOM = '/api/get-room';

export const createRoom = (title, votes_to_skip, guest_can_pause, onSuccess, onFailure) => async dispatch => {
    if (!title || !votes_to_skip || !guest_can_pause) {
        onFailure && onFailure('Please fill all the details.');
        return;
    }
    
    if (localStorage.getItem('accessToken')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('accessToken')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ title, votes_to_skip, guest_can_pause });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}${URL_CREATE_ROOM}`, body, config);

            dispatch({
                type: actionTypes.roomActions.CREATE_ROOM_SUCCESS,
                payload: res.data
            });
            onSuccess && onSuccess(res.data);
        } catch (err) {
            dispatch({
                type: actionTypes.roomActions.CREATE_ROOM_FAILURE
            });
            onFailure && onFailure(err.data);
            // TODO: dispatch Fail message and show the snackbar message.
        }
    } else {
        dispatch({
            type: actionTypes.roomActions.CREATE_ROOM_FAILURE
        });
        onFailure && onFailure('User session expired');
        // TODO: dispatch Fail message and show the snackbar message.
    }
};

export const joinRoom = (code, onSuccess, onFailure) => async dispatch => {
    if (!code) {
        onFailure && onFailure('Please fill all the details.');
        return;
    }
    
    if (localStorage.getItem('accessToken')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('accessToken')}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ code });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}${URL_JOIN_ROOM}`, body, config);

            dispatch({
                type: actionTypes.roomActions.JOIN_ROOM_SUCCESS,
                payload: res.data
            });
            onSuccess && onSuccess(res.data);
        } catch (err) {
            // TODO: parse error code.
            dispatch({
                type: actionTypes.roomActions.JOIN_ROOM_FAILURE
            });
            onFailure && onFailure(err.data);
        }
    } else {
        dispatch({
            type: actionTypes.roomActions.JOIN_ROOM_FAILURE
        });
        onFailure && onFailure('User session expired');
    }
};

export const getRoom = (code, onSuccess, onFailure) => async dispatch => {
    if (!code) {
        onFailure && onFailure('Please fill all the details.');
        return;
    }

    if (localStorage.getItem('accessToken')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('accessToken')}`,
                'Accept': 'application/json'
            }
        };

        const details = {
            'code': code
        }

        const params = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}${URL_GET_ROOM}?${params}`, config);

            dispatch({
                type: actionTypes.roomActions.GET_ROOM_SUCCESS,
                payload: res.data
            });
            onSuccess && onSuccess(res.data);
        } catch (err) {
            // TODO: Parse the error code and return apt message to show to user.
            dispatch({
                type: actionTypes.roomActions.GET_ROOM_FAILURE
            });
            onFailure && onFailure(err.data);
        }
    } else {
        dispatch({
            type: actionTypes.roomActions.GET_ROOM_FAILURE
        });
        onFailure && onFailure('User session expired');
    }
}