import { LOGIN, GET_CONFIG, SET_CONFIG, POST_CONFIG, EXIT_CONFIG, DELETE_CONFIG, SUCCESS, FAILURE } from './actionTypes'
import cookie from 'js-cookie'

export const login = (payload) => {

    // use saga to handle real login action
    if (payload.username == 'admin')
        return {
            type: `${LOGIN}/${SUCCESS}`,
            payload
        }
}

export const logout = (payload) => {

    // use saga to handle real logout action
    return {
        type: `${LOGIN}/${FAILURE}`,
        payload
    }

}

export const getConfig = (entry, query) => {

    return {
        type: `${GET_CONFIG}`,
        payload: {
            entry: entry,
            query: query || {}
        }
    }

}

export const setConfig = (entry, payload) => {

    return {
        type: `${SET_CONFIG}`,
        payload: {
            entry: entry,
            data: payload.data
        }
    }

}

export const delConfig = (entry, payload) => {

    return {
        type: `${DELETE_CONFIG}`,
        payload: {
            entry: entry,
            data: payload.data
        }
    }

}

export const postConfig = (entry, payload) => {

    return {
        type: `${POST_CONFIG}`,
        payload: {
            entry: entry,
            data: payload.data
        }
    }

}


export const exitConfig = (entry, query) => {

    return {
        type: `${EXIT_CONFIG}`,
        payload: {
            entry: entry,
            query: query || {}
        }
    }

}


