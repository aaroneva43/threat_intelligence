import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Vuln.scss'

import _ from 'lodash'

class Vuln extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('brief')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props


        const columns = [{
            title: '名称',
            dataIndex: '',
            key: 'ip',
            flex: '1',
        }, {
            title: '严重程度',
            dataIndex: '',
            key: '',
            width: '80px',
            className: 'column-center_align'
        },{
            title: '存在数量',
            dataIndex: '',
            key: '',
            width: '80px',
            className: 'column-right_align'
        }, {
            title: '所属操作系统／应用',
            dataIndex: 'numOfApps',
            key: '',
            width: '350px',
           
        }]



        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={{ height: '100%' }}
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
)(Vuln)




