import { PENDING, SUCCESS, FAILURE, GET_MENU } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = [
    {
        name: 'status',
        text: 'Dashboard',
        icon: 'status',
        children: [
            {
                name: 'status',
                text: 'Dashboard'
            }
        ]
    },

    {
        name: 'system',
        text: 'System',
        icon: 'system',
        children: [
            {
                name: 'settings',
                text: 'Settings',
                modules: [
                    {
                        name: 'basic',
                        text: 'Basic',
                        gid: '732'
                    },
                    {
                        name: 'maintenance',
                        text: 'Maintenance',
                        widget: 'SystemSettingsMaintenance'
                    },
                ]
            },

            {
                name: 'administrator',
                text: 'Administrator',
                modules: [
                    {
                        name: 'admin',
                        text: 'Admin'
                    }
                ]
            }
        ]
    }]

const menu = reducerGenerator([GET_MENU], initialState, {
    [`${GET_MENU}`]: (state, action) => {
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