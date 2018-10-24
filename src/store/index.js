import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { middleware } from '../navigation';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav']
};

const persistedReducer = persistReducer(persistConfig, reducer);

/* eslint-disable */
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(middleware),
    applyMiddleware(sagaMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
/* eslint-enable */
