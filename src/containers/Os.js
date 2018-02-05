import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Os.scss'

import _ from 'lodash'

class Os extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('os_summary')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props


        const columns = [{
            title: '',
            dataIndex: 'key',
            key: 'key',
            width: 50
        },{
            title: '操作系统及版本',
            dataIndex: 'osName',
            key: 'os',
            //width: 300
        }, {
            title: '出现次数',
            dataIndex: 'numOfInstances',
            key: '',
            className: 'column-right_align',
            width: 80
        }
/*        , {
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
*/
        ]
        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{padding: "20px", height: '100%'}}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => 
                        <div style={{ padding: 15, margin: 10, background: "#fff" }}>
                        
                            <p>{record.osName}</p>
                                               
                        </div>}
                    size="small"
                    //scroll={{ x: 300 }}
                    pagination={{ simple: false, showTotal: (total) => { return `共 ${total} 条`; } }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.os_summary', []) }),
    { getConfig: getConfig }
)(Os)




