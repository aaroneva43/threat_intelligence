import { PENDING, SUCCESS, FAILURE, GET_MENU } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = [
    {
        name: 'dashboard',
        text: '首页',
        icon: 'dashboard'
    }, {
        name: 'assets',
        text: '资产',
        icon: 'assets',
        children: [
            {
                name: 'host',
                text: '主机'
            },
            {
                name: 'netDevice',
                text: '网络设备'
            },
            {
                name: 'os',
                text: '操作系统'
            },
            {
                name: 'app',
                text: '应用'
            },
            {
                name: 'vuln',
                text: '漏洞'
            },
            {
                name: 'topo',
                text: '网络拓扑'
            }
        ]
    }, {
        name: 'discovery',
        text: '发现'
    }, {
        name: 'reports',
        text: '报表'
    }, {
        name: 'configuration',
        text: '配置'
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