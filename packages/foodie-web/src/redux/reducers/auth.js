import * as t from '../../constants/actionType'


var initialState = {
  token: null,
  isAuthenticated: false,
  isFetching: false,
  loginDate: null
}; 

export default function(state, action) {
  state = state || initialState;

  switch (action.type) {
    case t.LOGIN_REQUEST:
      return {
          ...state,
          isFetching: true,
        isAuthenticated: false,
        token: action.id_token,
      } 
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        loginDate: new Date()
      }
    case t.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        token: null,
        loginError: action.message,

      }
    case t.LOGOUT_SUCCESS:
      return {
        ...state,

        isAuthenticated: false,
        token: null
      }

    default:
      return state;
  }
}