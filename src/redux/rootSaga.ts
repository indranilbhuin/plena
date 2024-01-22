import {all} from 'redux-saga/effects';
import watchTokenSaga from './sagas/productSaga';

function* rootSaga() {
  yield all([watchTokenSaga()]);
}

export default rootSaga;
