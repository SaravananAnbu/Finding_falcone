import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import configureStore  from './store';
import { AppContainer } from 'react-hot-loader';
import Root from './routes';
import history from './history';

export const store = configureStore();

ReactDOM.render(
	(<Provider store={store}>
			<AppContainer>
				<Root history={history}/>
			</AppContainer>
		</Provider>),
  document.getElementById('app')
);