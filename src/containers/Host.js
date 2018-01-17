import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Host.scss'

import _ from 'lodash'

class Host extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('brief')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props

        const columns = [{
            title: '主机 IP',
            dataIndex: 'ip',
            key: 'ip',
            width: '200px'
        },{
            title: '主机类型',
            dataIndex: '',
            key: '',
            width: '80px'
        },{
            title: '操作系统',
            dataIndex: 'osType',
            key: ''
        },{
            title: '应用数量',
            dataIndex: 'numOfApps',
            key: '',
            width: '80px',
            className: 'column-right_align'
        }, {
            title: '漏洞数量',
            children: [{
                title: '严重',
                dataIndex: 'vulns.critical',
                key: '',
                width: 80,
                className: 'column-right_align critical'
            }, {
                title: '高',
                dataIndex: 'vulns.high',
                key: '',
                width: 80,
                className: 'column-right_align high'
            }, {
                title: '中',
                dataIndex: 'vulns.medium',
                key: '',
                width: 80,
                className: 'column-right_align medium'
            }, {
                title: '低',
                dataIndex: 'vulns.low',
                key: '',
                width: 80,
                className: 'column-right_align low'
            }],
        },{
            title: '权重',
            dataIndex: '',
            key: '',
            width: "80px",
            className: 'column-center_align'
        },{
            title: '管理员',
            dataIndex: '',
            key: '',
            width: "100px"
        }]

console.log(data)

        return (

            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{ height: '100%', padding: "20px"}}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                    size="small"
                    scroll={{ x: 1140 }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.brief', []) }),
    { getConfig: getConfig }
)(Host)




