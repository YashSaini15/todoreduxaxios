import { applyMiddleware, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;