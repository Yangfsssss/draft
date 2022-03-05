import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loginReducer } from './loginReducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import loginSaga from '../action/loginSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  // 子 state
  combineReducers({ user: loginReducer }),
  applyMiddleware(thunk)
);

// sagaMiddleware.run(loginSaga);

export default store;
