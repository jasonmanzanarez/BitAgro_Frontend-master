import axios from "axios";
import { hostBack } from "../../keys";

export function getBinnacleWait(token, binnacleId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/activities/byBinnacle/wait/${binnacleId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function getBinnacleInit(token, binnacleId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/activities/byBinnacle/init/${binnacleId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function getBinnacleFinish(token, binnacleId) {
  return (dispatch) => {
    return axios.get(`${hostBack}/activities/byBinnacle/finish/${binnacleId}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function addActivitie(token, data) {
  return (dispatch) => {
    return axios.post(`${hostBack}/activitie`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function getActivitieById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/activitie/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editActivitie(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/activitie/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function deleteActivitie(token, id) {
  return (dispatch) => {
    return axios.delete(`${hostBack}/activitie/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function initActivitie(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/activitie/init/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}

export function finishActivitie(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/activitie/finish/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}
