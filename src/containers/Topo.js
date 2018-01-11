import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import _ from 'lodash'

console.log('x_x')
class Topo extends PureComponent {
    componentWillReceiveProps(nextProps) {}

    componentDidMount() {}

    render() {}
}


export default connect(
    state => ({
        config: _.get(state, 'config', {}),
        graphData: _.get(state, 'config.brief', [])
    }),
    { getConfig: getConfig, exitConfig: exitConfig }
)(Topo)
