import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/auth-reducers";
import settingReducer from "./reducers/setting-reducers";

const rootReducer = combineReducers(
    {
        userReducer,
        settingReducer
    }
);

export const Store = createStore(rootReducer, applyMiddleware(thunk));
