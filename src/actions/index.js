import { LOGIN, SUCCESS, FAILURE } from './actionTypes'
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