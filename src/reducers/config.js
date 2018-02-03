import { SUCCESS, FAILURE, GET_CONFIG, SET_CONFIG, POST_CONFIG, DELETE_CONFIG, EXIT_CONFIG } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = {}

const config = reducerGenerator([GET_CONFIG, EXIT_CONFIG], initialState, {
    [GET_CONFIG]: (state, action) => {
        return {
            ...state,
            pending: true
        }
    },
    [`${GET_CONFIG}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            [action.payload.entry]: action.payload.data,
            pending: false
        }
    },
    [`${GET_CONFIG}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: action.payload
        }
    },
    [POST_CONFIG]: (state, action) => {
        return {
            ...state,
            pending: true
        }
    },
    [`${POST_CONFIG}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false
        }
    },
    [`${POST_CONFIG}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: action.payload
        }
    },
    [DELETE_CONFIG]: (state, action) => {
        return {
            ...state,
            pending: true
        }
    },
    [`${DELETE_CONFIG}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false
        }
    },
    [`${DELETE_CONFIG}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: action.payload
        }
    },
    [`${SET_CONFIG}`]: (state, action) => {
        return {
            ...state,
            [action.payload.entry]: action.payload.data,
            pending: false
        }
    },
    [EXIT_CONFIG]: (state, action) => {
        return {
            ..._.merge(..._.map(state, (v, p) => { return p != action.payload.entry && { [p]: v } })),
            pending: false,
            error: action.payload
        }
    }
})

export default config