import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'

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
            flex: '1'
        },{
            title: '类型',
            dataIndex: '',
            key: '',
            width: '120px'
        },{
            title: '操作系统',
            dataIndex: '',
            key: '',
            width: '120px'
        },{
            title: '应用数量',
            dataIndex: '',
            key: '',
            width: '200px'
        },{
            title: '漏洞数量',
            dataIndex: '',
            key: '',
            width: '200px'
        }
    ]


        return (
            <Table style={ {height:'100%'}} 
                columns={columns} 
                expandedRowRender={record => <p style={{ margin: 0 }}>{record.ip}</p>}
                dataSource={data} 
            />
        )
    }
}


export default connect(
    state => ({ data: _.get(state, 'config.ips', []) }),
    { getConfig: getConfig }
)(Host)

