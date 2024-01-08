import axios from "axios";
import { hostBack } from "../../keys";

export function getListLots(token) {
  return (dispatch) => {
    return axios.get(`${hostBack}/lots`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addLot(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/lots`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getLotById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/lots/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editLot(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/lots/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deleteLot(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/lots/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}
