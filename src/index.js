import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import 'babel-polyfill'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

import { Router } from 'react-router-dom';

import routes from './routes'
import reducers from './reducers'


const history = createHistory({ basename: '/' })
const sagaMiddleware = createSagaMiddleware()
const middleware = [routerMiddleware(history), sagaMiddleware]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

sagaMiddleware.run(sagas)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {routes}
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'))

