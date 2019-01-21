import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './components/app';
import Home from './containers/home';
import history from './history';

export default class Root extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <App>
                        <Route path="/" component={Home}/>   
                    </App>
                </Switch>
            </Router>
        );
    }
}