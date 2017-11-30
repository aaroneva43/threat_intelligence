import React, { Component, createElement } from 'react'
import css from './Main.scss'
import { connect } from 'react-redux';

import Login from './Login'
import Nav from '../components/Nav'

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
        return (
            <div>
                {
                    (!auth.pending && !auth.authed) &&
                    <Login />


                }
                {
                    (!auth.pending && auth.authed) &&
                    <div>
                        <Nav
                            location={location}
                            menuData={menu}
                        />
                    </div>
                }

            </div>

        )
    }
}


export default connect(state => ({ auth: _.get(state, 'auth', false), menu: _.get(state, 'menu', []) }))(Main)