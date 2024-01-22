import {combineReducers} from 'redux';
import allTokenReducer from './slices/allTokenSlice';
import tokenReducer from './slices/tokenSlice';

const rootReducer = combineReducers({
  allToken: allTokenReducer,
  token: tokenReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
