import React, { Component } from 'react';
import { Router, Route, Switch, hashHistory } from 'react-router-dom';
import App from './components/app';
import Home from './containers/home';
import Result from './components/result';
import history from './history';

export default class Root extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <App>
                        <Route exact path="/" component={Home}/>   
                        <Route exact path="/result" component={Result}/>
                    </App>
                </Switch>
            </Router>
        );
    }
}