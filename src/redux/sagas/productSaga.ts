import {call, put, takeEvery} from 'redux-saga/effects';
import {apiNetwork} from '../../network/apiService';
import {
  fetchAllTokenError,
  fetchAllTokenRequest,
  fetchAllTokenSuccess,
} from '../slices/allTokenSlice';

export function* getAllToken(): Generator<any, void, any> {
  try {
    const response = yield call(apiNetwork.get, 'token');
    yield put(fetchAllTokenSuccess(response.data.content));
  } catch (error) {
    console.log('error', error);
    yield put(fetchAllTokenError(error.message));
  }
}

export default function* watchTokenSaga() {
  yield takeEvery(fetchAllTokenRequest.type, getAllToken);
}
