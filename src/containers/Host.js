import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Host.scss'

import _ from 'lodash'

class Host extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('ips')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {

/*
       let { data = [] } = this.props
      
 
       data = data.map(itm => {
            return {
                ip: itm,
                key: itm

            }
        })
*/

    /* mock data begin, this data will be replaced by REST API data access code */

    var data2 = [
        {
          "deviceType": "Host", 
          "ip": "172.16.0.2", 
          "key": "172.16.0.2", 
          "numOfApps": 3, 
          "numOfOpenPorts": 4, 
          "osType": "Ubuntu 16.04", 
          "route": "192.168.3.2,192.168.3.1,172.16.0.2", 
          "vulns": {
            "critical": 0, 
            "high": 0, 
            "low": 0, 
            "medium": 0
          }
        }, 
        {
          "deviceType": "Host", 
          "ip": "192.168.1.69", 
          "key": "192.168.1.69", 
          "numOfApps": 6, 
          "numOfOpenPorts": 8, 
          "osType": "Windows 10 Home 16299", 
          "route": "192.168.1.78,192.168.1.69", 
          "vulns": {
            "critical": 0, 
            "high": 0, 
            "low": 16, 
            "medium": 0
          }
        }, 
        {
          "deviceType": "Host", 
          "ip": "130.207.160.173", 
          "key": "130.207.160.173", 
          "numOfApps": "", 
          "numOfOpenPorts": "", 
          "osType": "", 
          "route": "", 
          "vulns": {
            "critical": 0, 
            "high": 0, 
            "low": 1, 
            "medium": 0
          }
        }, 
        {
          "deviceType": "Host", 
          "ip": "164.67.228.152", 
          "key": "164.67.228.152", 
          "numOfApps": "", 
          "numOfOpenPorts": 2, 
          "osType": "CentOS 6", 
          "route": "192.168.1.78,75.49.252.1,71.148.134.57,71.145.0.206,12.83.39.145,12.122.114.5,* * *,4.15.122.46,137.164.11.31,137.164.11.0,137.164.11.36,137.164.11.23,* * *,169.232.4.8,169.232.4.53,* * *,164.67.134.252,164.67.228.152", 
          "vulns": {
            "critical": 0, 
            "high": 0, 
            "low": 16, 
            "medium": 0
          }
        }, 
        {
          "deviceType": "Host", 
          "ip": "54.192.117.243", 
          "key": "54.192.117.243", 
          "numOfApps": "", 
          "numOfOpenPorts": 2, 
          "osType": "", 
          "route": "192.168.1.78,75.49.252.1,71.148.134.57,71.145.0.206,12.83.39.145,12.122.137.213,206.121.188.34,* * *,72.21.222.2,* * *,54.192.117.243", 
          "vulns": {
            "critical": 0, 
            "high": 0, 
            "low": 10, 
            "medium": 0
          }
        }
      ]

     /* =========  mock data ends */

        const columns = [{
            title: '资产 IP',
            dataIndex: 'ip',
            key: 'ip',
            flex: '1',
            className: 'medium'
            
        },{
            title: '设备类型',
            dataIndex: 'deviceType',
            key: '',
            width: '120px',
        },{
            title: '操作系统',
            dataIndex: 'osType',
            key: '',
            width: '200px'
        },{
            title: '应用数量',
            dataIndex: 'numOfApps',
            key: '',
            width: '120px',
            className: 'column-right_align'
        },{
            title: '漏洞数量',
            children: [{
                title: '严重',
                dataIndex: 'vulns.critical',
                key: '',
                width: 80,
                className: 'column-right_align'
            }, {
                title: '高',
                dataIndex: 'vulns.high',          
                key: '',
                width: 80,
                className: 'column-right_align'
            }, {
                title: '中',
                dataIndex: 'vulns.medium',
                key: '',
                width: 80,
                className: 'column-right_align'
            },{
                title: '低',
                dataIndex: 'vulns.low',
                key: '',
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
                    dataSource={data2}
                    expandedRowRender={record => <div style={{ margin: 5, background:"#fff" }}>{record.osType}</div>} 
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




