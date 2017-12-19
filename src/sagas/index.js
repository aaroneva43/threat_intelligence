import { takeEvery } from 'redux-saga/effects'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import * as actions from '../actions/actionTypes'

import _ from 'lodash'

import API from '../api/'

function* getConfig(action) {
    try {
        const data = yield call(API.getConfig, action.payload)

        yield put({ type: `${actions.GET_CONFIG}/${actions.SUCCESS}`, payload: _.extend(action.payload, { data: data }) })
    } catch (e) {
        yield put({ type: `${actions.GET_CONFIG}/${actions.FAILURE}`, payload: { message: e.message } })
    }
}

export default function* sagas() {

    // LOGIN

    // AUTH

    // CONFIG
    yield takeEvery(actions.GET_CONFIG, getConfig)



}