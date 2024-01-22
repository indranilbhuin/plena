import {call, put, takeEvery} from 'redux-saga/effects';
import {apiNetwork} from '../../network/apiService';
import {
  fetchAllTokenError,
  fetchAllTokenRequest,
  fetchAllTokenSuccess,
} from '../slices/allTokenSlice';
import {
  fetchTokenError,
  fetchTokenRequest,
  fetchTokenSuccess,
} from '../slices/tokenSlice';

export function* getAllToken(): Generator<any, void, any> {
  try {
    const response = yield call(apiNetwork.get, 'token');
    yield put(fetchAllTokenSuccess(response.data.content));
  } catch (error) {
    console.log('error', error);
    yield put(fetchAllTokenError(error.message));
  }
}

export function* getTokenById(action: any): Generator<any, void, any> {
  try {
    const coingeckoId = action.payload;
    console.log("in saga", coingeckoId)
    const response = yield call(
      apiNetwork.get,
      `charts/v1/getTokenCharts?id=${coingeckoId}`,
    );
    yield put(fetchTokenSuccess(response.data.token));
  } catch (error) {
    console.log('error', error);
    yield put(fetchTokenError(error.message));
  }
}

export default function* watchTokenSaga() {
  yield takeEvery(fetchAllTokenRequest.type, getAllToken);
  yield takeEvery(fetchTokenRequest.type, getTokenById);
}
