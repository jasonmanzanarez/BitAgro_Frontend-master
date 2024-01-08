import axios from "axios";
import { hostBack } from "../../keys";

export function getListCycles(token) {
  return (dispatch) => {
    return axios.get(`${hostBack}/cycles`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addCycle(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/cycles`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getCycleById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/cycles/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editCycle(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/cycles/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deleteCycle(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/cycles/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}
