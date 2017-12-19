import { SUCCESS, FAILURE, GET_CONFIG } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = {}

const config = reducerGenerator([GET_CONFIG], initialState, {
    [`${GET_CONFIG}`]: (state, action) => {
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
    }
})

export default config