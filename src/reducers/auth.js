import { PENDING, SUCCESS, FAILURE, LOGIN, AUTH } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = { pending: false, success: false, token: null, authed: false }

const auth = reducerGenerator([LOGIN, AUTH], initialState, {
    [`${AUTH}`]: (state, action) => {
        return {
            ...state,
            pending: true,
            authed: false
        }
    },
    [`${AUTH}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: true,
            token: action.payload.result
        }
    },
    [`${AUTH}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: false,
            error: action.payload
        }
    },
    [`${LOGIN}`]: (state, action) => {
        return {
            ...state,
            pending: true,
            authed: false
        }
    },
    [`${LOGIN}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: true
        }
    },
    [`${LOGIN}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: false,
            error: action.payload
        }
    }
})

export default auth