import utils from '../utils'

const API_BASE = 'http://104.239.230.184:5000'

export default {

    getConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            query: cfg.query || {}
        }

        return fetch(`${API_BASE}/${cfg.entry}?${utils.serializeParams(cfg.query)}`).then(response => response.json())
    },
    postConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            data: cfg.data
        }

        return fetch(`${API_BASE}/${cfg.entry}/new`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cfg.data)
        }).then(response => response.json())
    },
    delConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            data: cfg.data
        }

        return fetch(`${API_BASE}/${cfg.entry}/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cfg.data)

        }).then(response => response.json())
    }
}