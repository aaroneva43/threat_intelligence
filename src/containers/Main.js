import React, { Component, createElement } from 'react'
import css from './Main.scss'
import { connect } from 'react-redux';

import Login from './Login'

class Main extends Component {

    render() {
        const { auth } = this.props
        return (
            <div >
                {
                    (!auth.pending && !auth.authed) &&
                    <Login />


                }
                {
                    (!auth.pending && auth.authed) &&
                    <div>
                        Main
                    </div>
                }

            </div>

        )
    }
}


export default connect(state => ({ auth: _.get(state, 'auth', false) }))(Main)