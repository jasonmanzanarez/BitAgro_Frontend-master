import axios from "axios";
import { hostBack } from "../../keys";

export function getFinanceById(token, id) {
  return (dispatch) => {
    return axios.get(`${hostBack}/finances/${id}`, {
      headers: {
        token: token,
      },
    });
  };
}

export function editFinance(token, id, data) {
  return (dispatch) => {
    return axios.put(`${hostBack}/finances/${id}`, data, {
      headers: {
        token: token,
      },
    });
  };
}
