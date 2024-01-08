import axios from "axios";
import { hostBack } from "../../keys";

export function getListHR(token) {
  return (dispatch) => {
    return axios.get(`${hostBack}/humanResources`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addPerson(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/humanResources`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getPersonById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/humanResources/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editPerson(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/humanResources/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deletePerson(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/humanResources/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}
