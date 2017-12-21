import utils from '../utils'

const API_BASE = 'http://104.239.230.184:5000'

export default {

    getConfig: (cfg) => {
        cfg = {
            entry: cfg.entry || '',
            query: cfg.query || {}
        }

        return fetch(`${API_BASE}/${cfg.entry}?${utils.serializeParams(cfg.query)}`).then(response => response.json())
    }
}