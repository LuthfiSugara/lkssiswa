import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/auth-reducers";
import materiReducer from "./reducers/materi-reducers";
import settingReducer from "./reducers/setting-reducers";
import classReducer from "./reducers/class-reducers";
import mapelReducer from "./reducers/mapel-reducers";

const rootReducer = combineReducers(
    {
        userReducer,
        settingReducer,
        materiReducer,
        classReducer,
        mapelReducer,
    }
);

export const Store = createStore(rootReducer, applyMiddleware(thunk));
