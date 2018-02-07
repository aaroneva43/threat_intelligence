import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import { Tabs } from 'antd'
import _ from 'lodash'
import css from './Table.scss'

import vis from 'vis'

class Topo extends PureComponent {
    componentWillReceiveProps(nextProps) {
        const { graphData, getConfig } = nextProps

        if (!_.isEmpty(graphData)) {
            const me = this
            
            // Create a data table with nodes.
            var nodes = [];
            var edges =[];

            function addNodes(nodes, graphData) {

                var ICON_DIR = '../img/icons/'
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
                        color = '#294596'
                    } else {
                        color = '#216033'
                    }
                    nodes.push({
                        id: graphData[i].ip,
                        label: graphData[i].ip,
                        //image:  ICON_DIR+ 'icon_assets.svg', 
                        //shape: 'image',
                        shape: 'icon',
                        icon: {
                          face: 'FontAwesome',
                          code: '\uf26c',
                          size: 50,
                          color: '#3b5d34'
                        }                   
                    });
                }

                return nodes;

            }

            addNodes(nodes,graphData)

            edges.push({
                from: '192.168.1.65',
                to: '192.168.1.178',
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
                        shape: 'icon',
                        icon: {
                          face: 'FontAwesome',
                          code: '\uf0c0',
                          size: 50,
                          color: '#57169a'
                        }
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

            network.once('stabilized', function() {
                var scaleOption = { data };
                //network.moveTo(scaleOption);
                network.fit({ 
                    nodes:scaleOption
                })

            })
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
                title: '应用名/版本',
                dataIndex: 'service',
                key: 'service',
                flex: '1'
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
                    dataIndex: '',
                    key: 'critical',
                    width: 50,
                    className: 'column-right_align critical'
                }, {
                    title: '高',
                    dataIndex: '',
                    key: 'high',
                    width: 50,
                    className: 'column-right_align high'
                }, {
                    title: '中',
                    dataIndex: '',
                    key: 'medium',
                    width: 50,
                    className: 'column-right_align medium'
                }, {
                    title: '低',
                    dataIndex: '',
                    key: 'low',
                    width: 50,
                    className: 'column-right_align low'
                }],
            }]

            var appData =[]

            var nodeDetails = JSON.stringify(config[entry], null, 4)
            var tabOneTitle = "应用"
            var tabTwoTitle = "开放端口"
            var tabThreeTitle = "漏洞"

            if(!_.isEmpty(nodeDetails)) {
                console.log('node details  ' + (nodeDetails))                  
                var hostIP = JSON.parse(nodeDetails).ip 
                var osInfo = JSON.parse(nodeDetails).os_info           
                var services = JSON.parse(nodeDetails).services    
                var openPorts = JSON.parse(nodeDetails).ports          

                if (!_.isEmpty(services)){
                     var numOfService = services.length
                     for( var i = 0; i < numOfService; i++){
                         var serviceArray = services[i].split(",")                   
                            appData.push({
                                port: serviceArray[0],
                                protocol: serviceArray[1],   
                                service: serviceArray[2],                   
                            });
                     }
                     tabOneTitle = tabOneTitle + "  ( " + i + " )"

                }

                if (!_.isEmpty(openPorts)){
                    
                    tabTwoTitle = tabTwoTitle + "  ( " + openPorts.split(',').length + " )"

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
                    <div>
                        <div className="col1">
                            <p><span>IP地址</span></p>
                        </div>
                        <div className="col2">
                            <p>{hostIP}</p>
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
                                <p>{osInfo}</p>
                        </div>
                        <div className="col3">
                            <p>管理员</p>
                        </div>
                        <div className="col4">
                            <p></p>
                        </div>
                    </div>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab= {tabOneTitle} key="1">
                            <Table style={{ padding: "10px", paddingTop: "0"}}
                                columns={columns}
                                dataSource={appData}
                                bordered
                                size="small"
                                pagination={false}
                                //scroll={{y:850 }}  
                                
                            />
                        </TabPane>
                        <TabPane tab={tabTwoTitle} key="2">
                                            {openPorts}
                        </TabPane>
                        <TabPane tab={tabThreeTitle} key="3">
                                            Content of Tab Pane 3
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

