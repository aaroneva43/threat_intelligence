import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './App.scss'

import _ from 'lodash'

class App extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('brief')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props


        const columns = [{
            title: '应用名称及版本',
            dataIndex: '',
            key: 'ip',
            flex: '1',
        }, {
            title: '出现次数',
            dataIndex: 'numOfApps',
            key: '',
            width: '80px',
            className: 'column-right_align'
        }, {
            title: '存在的漏洞',
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
                <Table style={{ height: '100%',margin: "20px"}}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                    size="small"
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.brief', []) }),
    { getConfig: getConfig }
)(App)




