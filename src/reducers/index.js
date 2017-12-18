import { combineReducers } from 'redux'


import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import menu from './menu'
import config from './config'

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    auth,
    menu,
    config
})