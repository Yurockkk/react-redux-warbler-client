import axios from "axios";
//a lighweight library to help user with fetching data (we can use fetch api as well)
/*note:
  1. axios[method] return a function
  2. when request get back successfully, we can access the data through `res.data` (read more on axios document)
  3. when request get back fail, we can get the error message by `err.response.data.error`
*/
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}

//when user logged in, we need to configure axios's header to add Authorization info (token) in it so that any future api call is Authorized, else we remove Authorization from axios
export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
