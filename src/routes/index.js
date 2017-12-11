import React, { Component, createElement } from 'react'
import { Route, IndexRoute, Redirect, Switch } from 'react-router'
import Main from '../containers/Main'

export default (
    <Switch>
        <Redirect from="/" exact to="/dashboard" render={({ location }) => { return createElement(Main, { location }) }} />

        <Route path="/" render={({ location }) => { return createElement(Main, { location }) }} />

    </Switch>
)
