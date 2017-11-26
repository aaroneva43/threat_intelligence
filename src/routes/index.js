import React, { Component, createElement } from 'react'
import { Route, IndexRoute, Redirect, Switch } from 'react-router'
import Main from '../containers/Main'

export default (
    <div>
        <Switch>
            {
                /* <Redirect from="/" to="/login" render={({ location }) => { return createElement(Login, { location }) }} /> */}

            <Route path="/" render={({ location }) => { return createElement(Main, { location }) }} ></Route>

        </Switch>
    </div>
)
