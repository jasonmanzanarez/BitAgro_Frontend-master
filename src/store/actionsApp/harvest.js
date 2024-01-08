import axios from "axios";
import { hostBack } from "../../keys";

export function getHarvestById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/harvest/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editHarvest(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/harvest/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}
