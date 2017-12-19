export default {

    serializeParams(params) {
        let rslt = ''
        Object.keys(params).forEach((p, index) => { rslt += (index != 0 ? '&' : '') + p + '=' + encodeURIComponent(params[p]) })

        return rslt
    }
}