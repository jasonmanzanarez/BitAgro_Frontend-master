import axios from "axios";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import { SET_CURRENT_USER } from "../actions";
import { hostBack } from "../../keys";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function login(data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/login`, data).then((res) => {
      const token = res.data.token;
      const id = res.data.user.id;
      const name = res.data.user.name;
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      setAuthorizationToken(token);
    });
  };
}

export function signUp(data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/user/signUp`, data);
  };
}

export function sendResetPassword(data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/user/resetPassword`, data);
  };
}

export function ResetPassword(data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/user/resetPassword/confirm`, data);
  };
}
