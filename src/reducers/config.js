import { SUCCESS, FAILURE, GET_CONFIG } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = {}

const menu = reducerGenerator([GET_CONFIG], initialState, {
    [`${GET_CONFIG}`]: (state, action) => {
        return {
            ...state,
            pending: true,
            authed: false
        }
    },
    [`${GET_MENU}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: true
        }
    },
    [`${GET_MENU}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            authed: false,
            error: action.payload
        }
    }
})

export default menu