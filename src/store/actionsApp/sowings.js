import axios from "axios";
import { hostBack } from "../../keys";

export function getSowingByLotId(token, lotId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/sowing/byLots/${lotId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function getSowingAll(token) {
  return (dispatch) => {
    return axios.get(`${hostBack}/all/sowings`, {
      headers: {
        token: token,
      },
    });
  };
}

export function getTotalSowingByLotId(token, lotId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/sowing/active/byLot/${lotId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addSowing(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/sowing`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getSowingById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/sowing/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editSowing(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/sowing/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deleteSowing(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/sowing/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}
