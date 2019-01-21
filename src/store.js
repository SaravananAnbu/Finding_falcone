import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import history from './history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import FetchReducer from './reducers/fetchReducer';

const middleware = routerMiddleware(history);

export default function configureStore(preloadedState) {
    let store = null;
  
    if (module.hot) {
      let actionCreators = {};
      store = createStore(combineReducers({
            FetchReducer,
            router: routerReducer   
        }), compose(applyMiddleware(thunk, middleware),
        window.devToolsExtension ? window.devToolsExtension({actionCreators}) : f => f
      ));
    }
    else {
      store = createStore(
            combineReducers({
                FetchReducer,
                router: routerReducer   
            }), applyMiddleware(thunk, middleware));
        }
  
    return store
  }
  