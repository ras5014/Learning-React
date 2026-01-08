import { createStore, combineReducers, applyMiddleware } from "redux";
import counterReducer from "../features/counter/counterSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;
