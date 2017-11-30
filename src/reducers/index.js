import { combineReducers } from 'redux'


import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import menu from './menu'

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    auth,
    menu
})