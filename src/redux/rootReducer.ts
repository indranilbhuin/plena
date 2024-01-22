import {combineReducers} from 'redux';
import allTokenReducer from './slices/allTokenSlice';

const rootReducer = combineReducers({
  allToken: allTokenReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
