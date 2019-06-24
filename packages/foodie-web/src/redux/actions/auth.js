import { push } from 'react-router-redux';

 import * as t from '../../constants/actionType'
 import {setLocalStorage, clearLocalStorage} from '../utils/localStorage';
 import { doLogin, doRegister } from '../../api/serviceOperations'
 import setAuthorizationHeader from "../utils/setAuthorizationHeader";

function requestLogin(creds) {
  return {
    type: t.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: t.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

function loginError(message) {
  return {
    type: t.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: t.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

export function logoutFailure (error) {
  return {
    type: t.LOGIN_FAILURE,
    payload: error
  }
}

  // redux async action
  export function signup (data) {
    return dispatch => {
      dispatch(signupRequest())
        doLogin(data)
        .then(response => {
          dispatch(signupSuccess( response.data.token));
          setLocalStorage('foodie', response.data.token);
          setAuthorizationHeader(response.data.token);
          dispatch(push('/'));
        })
      .catch(err => {
          dispatch(signupFailure(err.response.data.error));
      });
};
};