import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import questionReducer from "./reducers/questionReducer";


const initialState = {};
const store = createStore(
    combineReducers({questions: questionReducer}),
    initialState,
    compose(applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;