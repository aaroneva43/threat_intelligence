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

function* postConfig(action) {
    try {
        const data = yield call(API.postConfig, action.payload)

        // yield put({ type: `${actions.POST_CONFIG}/${actions.SUCCESS}`, payload: _.extend(action.payload, { data: data }) })
        yield put({ type: `${actions.GET_CONFIG}`, payload: _.extend(action.payload, { data: data }) })
    } catch (e) {
        yield put({ type: `${actions.POST_CONFIG}/${actions.FAILURE}`, payload: { message: e.message } })
    }
}

function* delConfig(action) {
    try {
        const data = yield call(API.delConfig, action.payload)

        // yield put({ type: `${actions.DELETE_CONFIG}/${actions.SUCCESS}`, payload: _.extend(action.payload, { data: data }) })
        yield put({ type: `${actions.GET_CONFIG}`, payload: _.extend(action.payload, { data: data }) })
    } catch (e) {
        yield put({ type: `${actions.DELETE_CONFIG}/${actions.FAILURE}`, payload: { message: e.message } })
    }
}

export default function* sagas() {

    // LOGIN

    // AUTH

    // CONFIG
    yield takeEvery(actions.GET_CONFIG, getConfig);
    yield takeEvery(actions.POST_CONFIG, postConfig);
    yield takeEvery(actions.DELETE_CONFIG, delConfig);



}