import axios from "axios";
import { hostBack } from "../../keys";

export function getBinnacleBySowingId(token, sowingId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/binnacle/bySowing/${sowingId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addBinnacle(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/binnacle`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getBinnacleById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/binnacle/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editBinnacle(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/binnacle/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deleteBinnacle(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/binnacle/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}
