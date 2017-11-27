import React, { Component } from 'react'
import { propTypes as reduxFormPropTypes, reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


import compose from 'recompose/compose'

import { Card, Button, Form } from 'antd'



import _ from 'lodash'

import style from './Login.scss'

import { login } from '../actions'

import antdFields from '../hoc/antd-redux-form'


const Input = antdFields.Input
const Select = antdFields.Select
const Option = antdFields.Option

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        minWidth: 600,
        border: 0
    },
    avatar: {
        margin: '2em 1em',
        textAlign: 'left ',
    },
    form: {
        padding: '0 1em 1em 1em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'stretch'
    },
    input: {
        display: 'flex',
        height: 68,
        borderRadius: 0
    },

    button: {
        height: 32,

    }
}


class Login extends Component {

    static PropTypes = {
        ...reduxFormPropTypes,
        theme: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    submit = ({ username, password }) => {
        const { login, location } = this.props;
        login({ username, password });
    }

    render() {
        const { handleSubmit, submitting, theme, translate } = this.props;

        return (
            <div style={{ ...styles.main, backgroundColor: "#fff" }}>
                <Card style={styles.card} >
                    <div style={styles.avatar}>
                        <span style={{ fontWeight: 'bold', color: '#555', fontSize: 20 }}>Threat</span>
                        <span style={{ fontWeight: 'bold', color: 'darkgreen', fontSize: 20 }}>Intelligence </span>
                        <span style={{ fontWeight: 'normal', color: '#333', fontSize: 14 }}>v0.0.1 </span>
                    </div>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <div style={styles.form}>
                            <div style={styles.input} >
                                <Field
                                    name="username"
                                    component={Input}
                                    placeholder={'username'}
                                    autoFocus={true}
                                />
                            </div>
                            <div style={styles.input}>
                                <Field
                                    name="password"
                                    component={Input}
                                    placeholder={'password'}
                                    type="password"
                                />
                            </div>

                            <Button style={styles.button} htmlType="submit" disabled={submitting} children={'Sign In'} />
                        </div>

                    </form>
                </Card>
            </div>

        )
    }
}

const enhance = compose(
    // decorate with redux-form
    reduxForm({
        form: 'login',
        validate: (values, props) => {

            const errors = {}
            if (!values.username) errors.username = 'required'
            if (!values.password) errors.password = 'required'
            return errors
        }
    }),
    // connect to store
    connect(
        (state) => ({
            submitting: _.get(state, 'auth.pending', false)
        })
        , { login: login })
)

export default enhance(Login)
