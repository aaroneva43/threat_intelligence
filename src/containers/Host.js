import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Host.scss'

class Host extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('ips')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props

        data = data.map(itm => {
            return {
                ip: itm,
                key: itm

            }
        })

        const columns = [{
            title: '资产 IP',
            dataIndex: 'ip',
            key: 'ip',
            flex: '1',
            className: 'medium'
            
        },{
            title: '设备类型',
            dataIndex: '',
            key: '',
            width: '120px',
        },{
            title: '操作系统',
            dataIndex: '',
            key: '',
            width: '120px'
        },{
            title: '应用数量',
            dataIndex: '',
            key: '',
            width: '120px',
            className: 'column-right_align'
        },{
            title: '漏洞数量',
            children: [{
                title: '严重',
                dataIndex: 'critical',
                key: 'critical',
                width: 80,
                className: 'column-right_align'
            }, {
                title: '高',
                dataIndex: 'high',          
                key: 'high',
                width: 80,
                className: 'column-right_align'
            }, {
                title: '中',
                dataIndex: 'medium',
                key: 'medium',
                width: 80,
                className: 'column-right_align'
            },{
                title: '低',
                dataIndex: 'low',
                key: 'low',
                width: 80,
                className: 'column-right_align'
            }],
        }
    ]
        return (
            <div style={{ height: '100%', background: '#fff' }}>
                <Table style={ {height:'100%'}} 
                    columns={columns} 
                    bordered
                    dataSource={data}
                    expandedRowRender={record => <div style={{ margin: 5, background:"#fff" }}>{record.ip}</div>} 
                    size="small" 
                />
            </div>      
            
        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.ips', []) }),
    { getConfig: getConfig }
)(Host)




