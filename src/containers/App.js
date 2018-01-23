import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './App.scss'

import _ from 'lodash'

class App extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('app_summary')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props


        const columns = [{
            title: '应用名称及版本',
            dataIndex: 'appName',
            key: 'appName',
            width: 400,
            
        },{
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: 80
        },{
            title: '协议',
            dataIndex: 'protocol',
            key: 'protocol',
            width: 80
        },{
            title: '出现次数',
            dataIndex: 'numOfInstances',
            key: 'numOfInstances',
            width: 80,
            className: 'column-right_align'
        }, {
            title: '存在的漏洞',
            children: [{
                title: '严重',
                dataIndex: '',
                key: 'critical',
                width: 80,
                className: 'column-right_align critical'
            }, {
                title: '高',
                dataIndex: '',
                key: 'high',
                width: 80,
                className: 'column-right_align high'
            }, {
                title: '中',
                dataIndex: 'medium',
                key: 'medium',
                width: 80,
                className: 'column-right_align medium'
            }, {
                title: '低',
                dataIndex: 'low',
                key: 'low',
                width: 80,
                className: 'column-right_align low'
            }],
        }
        ]



        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{ height: '100%',padding: "20px"}}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                    size="small"
                    scroll={{ x: 960 }}
                    pagination={{ hideOnSinglePage:true }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.app_summary', []) }),
    { getConfig: getConfig }
)(App)




