import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import { Tabs } from 'antd'
// import css from './DiscoveryConfig.scss'


import _ from 'lodash'

class DiscoveryConfig extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('ip_blocks')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props

        const columns = [{
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 80
        }]


        return (

            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{ height: '100%', padding: "20px", position: "relative", top: '0px', bottom: '0px' }}
                    columns={columns}
                    bordered
                    dataSource={data}
                    size="small"
                    scroll={{ x: 1240 }}
                    pagination={{ hideOnSinglePage: true }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.ip_blocks', []) }),
    { getConfig: getConfig }
)(DiscoveryConfig)




