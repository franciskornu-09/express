import axios from 'axios';
import {FETCH_USER} from "./types";

export const fetchUser = () => {
    return function (dispatch) {
        axios.get('/api/current_user')
            .then(function (res) {
                console.log("CURRENT USER "+JSON.stringify(res));
            dispatch({ type: FETCH_USER, payload: res})
        })
    }
};

export const handleToken = (token) => {
    return function (dispatch) {
        axios.post('/api/stripe', token).then(function (res) {
            dispatch({type: FETCH_USER, payload:res})
        });
    }
};