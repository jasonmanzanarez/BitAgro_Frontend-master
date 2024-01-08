import { createStore, combineReducers } from "redux";
import index from "./reducer";

const reducer = combineReducers({
  index,
});

const store = createStore(reducer);

export default store;
