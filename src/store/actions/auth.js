import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

//action creator
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    //the same as user: user
    user
  };
}

//action creator
export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

//action creator
export function logout() {
  return dispatch => {
    //implement logout logic, simply just clean up the token stored in user's localStorage
    localStorage.clear();
    //Remove token from axios header for all future request
    setAuthorizationToken(false);
    //set the current user to empty object
    dispatch(setCurrentUser({}));
  };
}

//action creator
export function authUser(type, userData) {
  // dispatch function provide by "thunk" module
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        //is equal to .then(data => {...})
        .then(({ token, ...user }) => {
          //logged in successfully!

          //save the token to localStorage
          localStorage.setItem("jwtToken", token);
          //Add token to axios header so that future api call (request) is authorized and allowed to fetch messages back
          setAuthorizationToken(token);
          //dispatch function provide by "thunk" module, set current user to be the user just got back from apiCall
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          console.log(err);
          //if we got error from apiCall, show the err message to user!
          dispatch(addError(err.message));
          reject(); // indicate the API call failed
        });
    });
  };
}
