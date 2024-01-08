import axios from "axios";
import { hostBack } from "../../keys";

export function getProfile(id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/user/${id}`);
  };
}

export function updateProfile(data, id) {
  return (dispatch) => {
    return axios.put(`${hostBack}/user/${id}`, data);
  };
}

export function changePassword(data, id) {
  return (dispatch) => {
    return axios.put(`${hostBack}/user/changePassword/${id}`, data);
  };
}

export function deleteAccount(id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/user/accountDelete/${id}`);
  };
}
