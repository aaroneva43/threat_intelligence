import React, { Component, createElement } from 'react'
import css from './Main.scss'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import Login from './Login'
import Nav from '../components/Nav'

import Dashboard from './Dashboard'

class Main extends Component {
    componentWillReceiveProps(nextProps) {

        const { auth, menu, dispatch } = nextProps

        const isAuthed = auth.authed && !auth.pending

        if (isAuthed && _.isEmpty(menu)) {
            // in formal code, u should dispatch this action & use saga to handle async request
            // dispatch({ type: 'GET_MENU' })
        }
    }

    render() {
        const { location, auth, menu } = this.props

        if (!auth.pending && !auth.authed) {
            return <Login />

        } else if (!auth.pending && auth.authed) {
            return <div className='main'>
                <Nav
                    location={location}
                    menuData={menu}
                />
                <div className='content'>
                    <Route path="/dashboard" exact render={({ location }) => { return createElement(Dashboard) }} />
                </div>
            </div>

        }

    }
}


export default connect(state => ({ auth: _.get(state, 'auth', false), menu: _.get(state, 'menu', []) }))(Main)