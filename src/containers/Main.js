import React, { Component, createElement } from 'react'
import css from './Main.scss'
import { connect } from 'react-redux'
import { Route } from 'react-router'

import Login from './Login'
import Nav from '../components/Nav'

import Dashboard from './Dashboard'
import Host from './Host'
import Topo from './Topo'
import App from './App'
import Vuln from './Vuln'
import Os from './Os'
import NetDevice from './NetDevice'
import DiscoveryConfig from './DiscoveryConfig'

import Mask from '../components/GlobalMask'
import GlobalMask from '../components/GlobalMask';

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
        const { location, auth, menu, config } = this.props

        if (!auth.pending && !auth.authed) {
            return <Login />

        } else if (!auth.pending && auth.authed) {
            return <div className='main'>
                <Nav
                    location={location}
                    menuData={menu}
                />
                <div classdiName='content'>
                    <Route path="/dashboard" exact render={({ location }) => { return createElement(Dashboard) }} />
                    <Route path="/assets/host" exact render={({ location }) => { return createElement(Host) }} />
                    <Route path="/assets/topo" exact render={({ location }) => { return createElement(Topo) }} />
                    <Route path="/assets/app" exact render={({ location }) => { return createElement(App) }} />
                    <Route path="/assets/vuln" exact render={({ location }) => { return createElement(Vuln) }} />
                    <Route path="/assets/Os" exact render={({ location }) => { return createElement(Os) }} />
                    <Route path="/assets/NetDevice" exact render={({ location }) => { return createElement(NetDevice) }} />
                    <Route path="/discovery/discovery_config" exact render={({ location }) => { return createElement(DiscoveryConfig) }} />
                </div>
                <GlobalMask visible={config.pending === true} />
            </div>

        }

    }
}


export default connect(state => ({
    auth: _.get(state, 'auth', false),
    menu: _.get(state, 'menu', []),
    config: _.get(state, 'config', {})
}))(Main)