import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import { Pagination } from 'antd'
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

    getOSIcon = (osType = '') => {

        if (osType.toLowerCase().indexOf('windows') >= 0) {
            return 'fab fa-windows fa-lg';
        } else if (osType.toLowerCase().indexOf('mac') >= 0) {
            return 'fab fa-apple fa-lg';
        } else if (osType.toLowerCase().indexOf('linux') >= 0  ||  osType.toLowerCase().indexOf('ubuntu') >= 0) {
            return 'fab fa-linux fa-lg';
        }


        //TODO other os
    }

    render() {
        const me = this;
        let { data = [] } = this.props
        const TabPane = Tabs.TabPane
        var hostDetails = JSON.stringify(data, null, 4)

        var hostArray = JSON.parse(hostDetails)
        var numOfHosts = hostArray.length

        window.addEventListener("resize", myFunction);

        function myFunction() {
            
            var hostTable = document.getElementById("myTable")

            console.log('table ID is '+ hostTable)

        }


        const columnsHost = [{
            title: '',
            dataIndex: 'key',
            key: 'key',
            width: 50
        },{
            title: '主机 IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 140
        }, {
            title: '主机类型',
            dataIndex: '',
            key: '',
            width: 80
        }, {
            title: '操作系统',
            dataIndex: 'osType',
            key: 'osType'
        }, {
            title: '应用',
            dataIndex: 'numOfApps',
            key: 'numOfApps',
            width: 80,
            className: 'column-right_align'
        }, {
            title: '开放端口',
            dataIndex: 'numOfOpenPorts',
            key: 'numOfOpenPorts',
            width: 80,
            className: 'column-right_align'
        }, {
            title: '漏洞数量',
            children: [{
                title: '严重',
                dataIndex: 'vulns.critical',
                key: 'vulns.critical',
                width: 80,
                className: 'column-right_align critical'
            }, {
                title: '高',
                dataIndex: 'vulns.high',
                key: 'vulns.high',
                width: 80,
                className: 'column-right_align high'
            }, {
                title: '中',
                dataIndex: 'vulns.medium',
                key: 'vulns.medium',
                width: 80,
                className: 'column-right_align medium'
            }, {
                title: '低',
                dataIndex: 'vulns.low',
                key: 'vulns.lowwewswwqdssw  q1  `',
                width: 80,
                className: 'column-right_align low'
            }],
        }, {
            title: '权重',
            dataIndex: '',
            key: '',
            width: 80,
            className: 'column-center_align'
        }, {
            title: '管理员',
            dataIndex: '',
            key: '',
            width: 80
        }]

        const columnsApp = [{
            title: '应用名/版本',
            dataIndex: 'appName',
            key: 'service'
        }, {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: '80px'
        }, {
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

        const columnsVuln = [{
            title: '漏洞名称',
            dataIndex: 'vulnName',
            key: 'vulnName'
        }, {
            title: '严重程度',
            dataIndex: 'severity',
            key: 'sevrity',
            width: '120px'
        }, {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: '80px'
        }, {
            title: '协议',
            dataIndex: 'protocol',
            key: 'protocol',
            width: '80px'
        }]


        var tabOneTitle = "应用"
        var tabTwoTitle = "开放端口"
        var tabThreeTitle = "漏洞"

        return (

            <div style={{ height: '100%', background: '#fff' }}>
                <Table id='myTable' style={{padding: "20px", position: "relative", top: '0px', bottom: '0px' }}
                    columns={columnsHost}
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
                                    <span className={me.getOSIcon(record.osType)} style={{ marginRight: "10px", color:'#3b5d34'}}/>{record.osType}
                                </div>

                                <div className="col3">
                                    <p>管理员</p>
                                </div>

                                <div className="col4">
                                    <p></p>
                                </div>
                            </div>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={tabOneTitle + " ( " + record.numOfApps + " )"} key="1">
                                    <Table style={{ padding: "10px", paddingTop: "0" }}
                                        columns={columnsApp}
                                        dataSource={record.services}
                                        bordered
                                        size="small"
                                        pagination={false}

                                    />
                                </TabPane>
                                <TabPane tab={tabTwoTitle + " ( " + record.numOfOpenPorts + " )"} key="2">
                                    {record.OpenPorts}
                                </TabPane>
                                <TabPane tab={tabThreeTitle + " ( " + (record.vulns.critical + record.vulns.high + record.vulns.medium + record.vulns.low) + " )"} key="3">

                                    <div style={{ background: "#fff" }}>

                                        <Table style={{ padding: "10px", paddingTop: "0" }}
                                            columns={columnsVuln}
                                            dataSource={record.services}
                                            bordered
                                            size="small"
                                            pagination={false}

                                        />
                                    </div>
                                </TabPane>

                            </Tabs>
                        </div>
                    }
                    size="small"
                    scroll={{ x: 1100, y: window.innerHeight -250}}
                    pagination={{ simple: false, showTotal: (total) => { return `共 ${total} 条`; } }}
                />
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.brief', []) }),
    { getConfig: getConfig }
)(Host)




