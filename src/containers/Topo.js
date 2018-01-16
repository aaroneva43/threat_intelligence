import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import { Tabs } from 'antd'
import _ from 'lodash'

class Topo extends PureComponent {
    componentWillReceiveProps(nextProps) {
        const { graphData, getConfig } = nextProps

        if (!_.isEmpty(graphData)) {
            const me = this
            
            // Create a data table with nodes.
            var nodes = [];
            var edges =[];

            function addNodes(nodes, graphData) {

                var nodeLength = graphData.length

                for (var i = 0; i < nodeLength; i++){

                    var vulnLow = graphData[i].vulns.low 
                    var vulnMedium = graphData[i].vulns.medium
                    var vulnHigh = graphData[i].vulns.high
                    var vulnCritical = graphData[i].vulns.critical

                    var routeArray =[]
                    routeArray = graphData[i].route.split(",")


                    var color = null

                    if( vulnCritical > 0){
                        color = '#e95a5a'
                    } else if (vulnCritical == 0 && vulnHigh > 0){
                        color = '#e9a84a'
                    } else if (vulnCritical == 0 && vulnHigh == 0 && vulnMedium > 0){
                        color = '#efd662'
                    } else if (vulnCritical == 0 && vulnHigh == 0 && vulnMedium == 0 && vulnLow > 0){
                        color = '#8ab7f4'
                    } else {
                        color = '#8af4a5'
                    }
                    nodes.push({
                        id: graphData[i].ip,
                        label: graphData[i].ip,
                        color: color,
                        shape:'dot',
                        
                    });
                }

                return nodes;

            }

            addNodes(nodes,graphData)

            edges.push({
                from: '172.16.0.2',
                to: '192.168.1.69',
                length: 150,
                width: 1
            });
 

            // create a network
            var topoContainer = document.getElementById('topo');
            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                nodes: {
                    scaling: {
                        min: 16,
                        max: 32
                    }
                },
                edges: {
                    color: "#24e219",
                    smooth: false
                },
                physics: {
                    barnesHut: {
                        gravitationalConstant: -30000
                    },
                    stabilization: {
                        iterations: 2500
                    }
                },
                groups: {
                    'switch': {
                        shape: 'dot',
                        color: '#FF9900' // orange
                    },
                    'desktop': {
                        shape: 'dot',
                        //color: "#2B7CE9" // blue
                    },
                    'red': {
                        color: "#24e219" // blue
                    },
                    'mobile': {
                        shape: 'dot',
                        color: "#5A1E5C" // purple
                    },
                    'server': {
                        shape: 'dot',
                        //              color: {color: '#C5000B', opacity: 0.8}
                        color: "#C5000B" // red
                    },
                    'internet': {
                        shape: 'dot',
                        //               color: {color: '#109618', opacity: 0.8}
                        color: "#109618" // green
                    }
                },
                layout: {
                    hierarchical: {
                        direction: "UD"
                    }
                },
                interaction: {
                    //navigationButtons: true,
                    keyboard: true
                }
            };
            var network = new vis.Network(topoContainer, data, options);

            network.on("doubleClick", function (params) {
                params.event = "[original event]";
                
                var nodeString = JSON.stringify(params, null, 4)

                const entry = 'app_info/' + JSON.parse(nodeString).nodes
                getConfig(entry)
                me.setState({ entry })

            });
            var zoomLevel = network.getScale()
console.log('zoom level   ' + zoomLevel)
        }
    }

    componentDidMount() {
        const { getConfig, exitConfig, graphData } = this.props
        getConfig('brief')        
    }

    render() {
        const TabPane = Tabs.TabPane
        const { config, exitConfig } = this.props,
            entry = _.get(this.state, 'entry')

            const columns = [{
                title: '应用名',
                dataIndex: 'service',
                key: 'service',
                flex: '1'
            },{
                title: '版本号',
                dataIndex: '',
                key: 'version',
                width: '80px'
            },{
                title: '开放端口',
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
                    key: '',
                    width: 50,
                    className: 'column-right_align critical'
                }, {
                    title: '高',
                    dataIndex: 'vulns.high',
                    key: '',
                    width: 50,
                    className: 'column-right_align high'
                }, {
                    title: '中',
                    dataIndex: 'vulns.medium',
                    key: '',
                    width: 50,
                    className: 'column-right_align medium'
                }, {
                    title: '低',
                    dataIndex: 'vulns.low',
                    key: '',
                    width: 50,
                    className: 'column-right_align low'
                }],
            }]

            var data =[]

            var nodeDetails = JSON.stringify(config[entry], null, 4)
            var tabOneTitle = "开放端口／应用"
            var tabTwoTitle = "严重漏洞"
            var tabThreeTitle = "高危漏洞"
            var tabFourTitle = "中危漏洞"
            var tabFiveTitle = "低危漏洞"

            if(!_.isEmpty(nodeDetails)) {
console.log('host info ' + nodeDetails)
                var hostIP = JSON.parse(nodeDetails).ip 
                var osInfo = JSON.parse(nodeDetails).os_info           
                var services = JSON.parse(nodeDetails).services
                

                if (!_.isEmpty(services)){
                     var numOfService = services.length
                     for( var i = 0; i < numOfService; i++){
                         var serviceArray = services[i].split(",")
                            data.push({
                                port: serviceArray[0],
                                protocol: serviceArray[1],   
                                service: serviceArray[2],                   
                            });
                     }
                     tabOneTitle = tabOneTitle + "  ( " + i + " )"

                }


            }

        return (
     
            <div id="topo" style={{ height: '100%', background: '#fff' }}>

                <Modal
                    visible={!!config[entry]}
                    onCancel={() => { exitConfig(entry) }}
                    footer={null}
                    title="设备信息"
                    width='800px'
                >
                    <table width = '100%'>
                        <tr>
                            <td width = '50%'>
                                <table width = '100%'>
                                    <tr height='30'>
                                        <td style={{fontWeight:'bold'}}>IP地址</td>
                                        <td>{hostIP}</td>
                                    </tr>
                                    <tr height='30'>
                                        <td style={{fontWeight:'bold'}}>操作系统</td>
                                        <td>{osInfo}</td>
                                    </tr>
                                </table>
                            </td>
                            <td width = '50%'>
                                <table width = '100%'>
                                    <tr height='30'>
                                        <td style={{fontWeight:'bold'}}>权重</td>
                                        <td></td>
                                    </tr>
                                    <tr height='30'>
                                        <td style={{fontWeight:'bold'}}>管理员</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr height = '10px'></tr>
                    </table>

                    <Tabs defaultActiveKey="1" style={{ maxHeight: "300px",fontSize: "20px !important" }}>
                        <TabPane tab= {tabOneTitle} key="1">
                            <Table style={{ height: '100%' ,margin: "10px", marginTop: "0"}}
                                columns={columns}
                                dataSource={data}
                                bordered
                                size="small"
                                pagination={false}
                                //scroll={{ y: "275px" }}
                            />
                        </TabPane>
                        <TabPane tab={tabTwoTitle} key="2">
                                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={tabThreeTitle} key="3">
                                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab={tabFourTitle} key="4">
                                            Content of Tab Pane 4
                        </TabPane>
                        <TabPane tab={tabFiveTitle} key="5">
                                            Content of Tab Pane 5
                        </TabPane>
                    </Tabs>                 
                </Modal>
            </div>

        )
    }
}

export default connect(
    state => ({
        config: _.get(state, 'config', {}),
        graphData: _.get(state, 'config.brief', [])
    }),
    { getConfig: getConfig, exitConfig: exitConfig }
)(Topo)


