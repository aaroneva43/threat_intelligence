import { LOGIN, SUCCESS } from './actionTypes'
import cookie from 'js-cookie'

export const login = (payload) => {

    // use saga to handle real login action
    if (payload.username == 'admin')
        return {
            type: `${LOGIN}/${SUCCESS}`,
            payload
        }
}
