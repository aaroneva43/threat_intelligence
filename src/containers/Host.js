import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import { Tabs } from 'antd'
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
        const TabPane = Tabs.TabPane
        var hostDetails = JSON.stringify(data, null, 4)

        var hostArray = JSON.parse(hostDetails)
        var numOfHosts = hostArray.length

        const columns = [{
            title: '主机 IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 200
        },{
            title: '主机类型',
            dataIndex: '',
            key: '',
            width: 80
        },{
            title: '操作系统',
            dataIndex: 'osType',
            key: '',
            width: 300
        },{
            title: '应用',
            dataIndex: 'numOfApps',
            key: '',
            width: 80,
            className: 'column-right_align'
        }, {
            title: '开放端口',
            dataIndex: 'numOfOpenPorts',
            key: '',
            width: 80,
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
            width: 80,
            className: 'column-center_align'
        },{
            title: '管理员',
            dataIndex: '',
            key: '',
            width: 100
        }]

        const columns2 = [{
            title: '应用名/版本',
            dataIndex: 'appName',
            key: 'service'
        },{
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: '80px'
        },{
            title: '协议',
            dataIndex: 'protocol',
            key: 'protocol',
            width: '80px'
        }, {
            title: '存在的漏洞',
            children: [{
                title: '严重',
                dataIndex: 'vulns.critical',
                key: 'critical',
                width: 80,
                className: 'column-right_align critical'
            }, {
                title: '高',
                dataIndex: 'vulns.high',
                key: 'high',
                width: 80,
                className: 'column-right_align high'
            }, {
                title: '中',
                dataIndex: 'vulns.medium',
                key: 'medium',
                width: 80,
                className: 'column-right_align medium'
            }, {
                title: '低',
                dataIndex: 'vulns.low',
                key: 'low',
                width: 80,
                className: 'column-right_align low'
            }],
        }]
 
        var tabOneTitle = "应用"
        var tabTwoTitle = "开放端口" 
        var tabThreeTitle = "漏洞"


        return (
            
            <div style={{ height: '100%', background: '#fff'}}>
                <Table style={{ height: '100%', padding: "20px",position:"relative",top:'0px',bottom:'0px' }}
                    columns={columns}
                    bordered
                    dataSource={data}
                    expandedRowRender={record => 
                        <div style={{ padding: 15, margin: 10, background: "#fff" }}>
                            
                            <div>
                                <div className="col1">
                                    <p><span>IP地址</span></p>
                                </div>

                                <div className="col2">
                                    <p>{record.ip}</p>
                                </div>

                                <div className="col1">
                                    <p>权重</p>
                                </div>

                                <div className="col2">
                                    <p></p>
                                </div>
                            </div>
                            <div>
                                <div className="col3">
                                    <p>操作系统</p>
                                </div>

                                <div className="col4">
                                    <p>{record.osType}</p>
                                </div>

                                <div className="col3">
                                    <p>管理员</p>
                                </div>

                                <div className="col4">
                                    <p></p>
                                </div>
                            </div>


                            <Tabs defaultActiveKey="1">
                                <TabPane tab= {tabOneTitle  + " ( " + record.numOfApps + " )"} key="1">
                                    <Table style={{ padding: "10px", paddingTop: "0"}}
                                    columns={columns2}
                                    dataSource={record.services}
                                    bordered
                                    size="small"
                                    pagination={false}
                                    //scroll={{y:850 }}  
                                    
                                    />
                                </TabPane>
                                <TabPane tab={tabTwoTitle  + " ( " + record.numOfOpenPorts + " )"} key="2">
                                   {record.ports}
                                </TabPane>
                                <TabPane tab={tabThreeTitle   + " ( " + (record.vulns.critical + record.vulns.high + record.vulns.medium + record.vulns.low) + " )"} key="3">
                                                    Content of Tab Pane 3
                                </TabPane>

                            </Tabs>                 

                        </div>
                    }
                    size="small"
                    scroll={{ x: 1240 }}
                    pagination={{ hideOnSinglePage:true }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.brief', []) }),
    { getConfig: getConfig }
)(Host)




