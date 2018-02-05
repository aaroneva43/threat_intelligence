import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './NetDevice.scss'

import _ from 'lodash'

class NetDevice extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props


        const columns = [{
            title: '设备 IP',
            dataIndex: 'ip',
            key: 'ip',
            width: '200px',
            fixed: 'left'
        }, {
            title: '设备类型',
            dataIndex: '',
            key: '',
            width: '80px',
        }, {
            title: '操作系统',
            dataIndex: 'osType',
            key: ''
        }, {
            title: '服务/端口数量',
            dataIndex: 'numOfApps',
            key: '',
            width: '120px',
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
        }
        ]



        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{ height: '100%', padding: "20px"}}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                    size="small"
                    scroll={{ x: 840 }}
                    pagination={{ hideOnSinglePage:true }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.', []) }),
    { getConfig: getConfig }
)(NetDevice)




