import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import { Tabs } from 'antd'
import { Button } from 'antd';
import _ from 'lodash'
import css from './Topo.scss'

// import FontAwesome from 'fontawesome'

class Topo extends PureComponent {

    tmpIP = null;
    drawn = false;

    expandedNodes = [];

    componentWillReceiveProps(nextProps) {
        const { graphData, getConfig } = nextProps

        if (!_.isEmpty(graphData) && this.drawn === false) {
            const me = this

            // Create a data table with nodes.
            var router_nodes = [];
            var host_nodes = [];
            var network_edges = [];
            var subnet_edges = [];
            var host_array = [];

            function getOSIcon(osType) {

                if (osType.toLowerCase().indexOf('windows') >= 0) {
                    return '\uf17a';
                } else if (osType.toLowerCase().indexOf('mac') >= 0) {
                    return '\uf179';
                } else if (osType.toLowerCase().indexOf('linux') >= 0 || osType.toLowerCase().indexOf('ubuntu') >= 0) {
                    return '\uf17c';
                } else {
                    return '\uf108'
                }
                //TODO other os
            }

            function getColor() {
                var color = ''
                var colorIndex = Math.floor(Math.random() * 5 + 1);

                if (colorIndex == 1) {
                    color = 'red'
                } else if (colorIndex == 2) {
                    color = 'orange'
                } else if (colorIndex == 3) {
                    color = 'yellow'
                } else if (colorIndex == 4) {
                    color = 'blue'
                } else if (colorIndex == 5) {
                    color = 'green'
                }

                return color
            }


            function draw_network(graphData) {

                for (var i = 0; i < graphData.length; i++) {

                    if (graphData[i].host_or_router == 2) {
                        var ip = graphData[i].ip
                        router_nodes.push({
                            id: ip,
                            label: ip,
                            group: 'one',
                            shape: 'icon',
                            icon: {
                                face: 'FontAwesome',
                                code: '\uf192',
                                size: 20,
                                color: '#3d4085',
                            },
                        });

                        var next_hops = graphData[i].next_hops
                        for (var j = 0; j < next_hops.length; j++) {
                            network_edges.push({
                                from: ip,
                                to: next_hops[j],
                                width: 0.15,
                                length: 200,
                                width: 1
                            })
                        }
                    } else if (graphData[i].host_or_router == 1) {
                        var host_record = []
                        host_record[0] = graphData[i].ip
                        host_record[1] = graphData[i].osType
                        host_array.push(host_record);
                    }
                }
            }

            function draw_subnet(graphData) {

                for (var i = 0; i < graphData.length; i++) {
                    var subnet = graphData[i].subnet
                    var icon_code


                    var numberOfHostsInSubnet = subnet.length
                    if (numberOfHostsInSubnet > 0) {
                        for (var j = 0; j < numberOfHostsInSubnet; j++) {
                            for (var k = 0; k < host_array.length; k++) {
                                if (subnet[j] == host_array[k][0]) {
                                    icon_code = getOSIcon(host_array[k][1])

                                }

                            }


                            var node_color = getColor()
                            var size = (Math.floor(Math.random() * 5 + 1)) * 5;
                            host_nodes.push({
                                id: subnet[j],
                                //                               label: subnet[j],
                                group: 'one',
                                shape: 'icon',
                                icon: {
                                    face: 'FontAwesome',
                                    code: icon_code,
                                    size: size,
                                    color: node_color,
                                },
                            });
                            subnet_edges.push({
                                width: 0.15,
                                from: graphData[i].ip,
                                to: subnet[j],
                                length: 100,
                                width: 1
                            })
                        }
                    }
                }
            }

            draw_network(graphData)
            draw_subnet(graphData)

            var all_nodes = me.expandedNodes.includes(this.tmpIP) ? router_nodes.concat(host_nodes) : router_nodes;
            var all_edges = me.expandedNodes.includes(this.tmpIP) ? network_edges.concat(subnet_edges) : network_edges;


            // create a network
            var topoContainer = document.getElementById('topo');
            var data = {
                nodes: all_nodes,
                edges: all_edges
            };
            var options = {
                borderWidth: 4,
                nodes: {
                    scaling: {
                        min: 5,
                        max: 10
                    },
                    color: {
                        border: 'red'
                    }
                },
                edges: {
                    color: "#24e219",
                    smooth: false
                },
                physics: {
                    barnesHut: { gravitationalConstant: -1500 },
                    stabilization: { iterations: 2500 }
                },
                groups: {
                    'one': { color: { background: '#543452' }, borderWidth: 3 },
                    1: { color: { background: 'blue' }, borderWidth: 3 },
                    2: { color: { background: 'yellow' }, borderWidth: 3 },
                    3: { color: { background: 'purple' }, borderWidth: 3 },
                    4: { color: { background: 'green' }, borderWidth: 3 }
                },

                layout: {
                    randomSeed: 1,
                },
                interaction: { hover: true },

            };
            var network = new vis.Network(topoContainer, data, options);
            var popupMenu = null

            network.on("doubleClick", function (params) {
                params.event = "[original event]";
                

                

                var nodeString = JSON.stringify(params, null, 4)
                var ip = JSON.parse(nodeString).nodes.pop()
                const entry = 'app_info/' + ip;

                if (me.expandedNodes.includes(ip)) {
                    me.expandedNodes = me.expandedNodes.map(itm => itm != ip);
                } else {
                    me.expandedNodes.push(ip);
                }


                me.tmpIP = ip;

                getConfig(entry)

                me.drawn = false;

                // var nodeString = JSON.stringify(params, null, 4)
                // const entry = 'app_info/' + JSON.parse(nodeString).nodes
                // getConfig(entry)
                // me.setState({ entry })

            });
            var zoomLevel = network.getScale()

            network.once('stabilized', function () {
                var scaleOption = { data };
                network.moveTo(scaleOption);
            })

            network.on('hoverNode', function (params) {

                if (popupMenu !== undefined) {
                    popupMenu.parentNode.removeChild(popupMenu);
                    popupMenu = undefined;
                }
            })

            network.on("oncontext", function (params) {

                if (network.getSelection().nodes.length > 0) {
                    var nodeString2 = JSON.stringify(params, null, 4)

                    popupMenu = document.createElement("div");
                    popupMenu.className = 'popupMenu';
                    popupMenu.style.left = JSON.parse(nodeString2).pointer.DOM.x + 35 + 'px';
                    popupMenu.style.top = JSON.parse(nodeString2).pointer.DOM.y + 135 + 'px';
                    topoContainer.appendChild(popupMenu);
                }

                params.event.preventDefault()  //prevent browser default right click event
                params.event = "[original event]";

                console.log('context menu click    ' + JSON.parse(nodeString2).pointer.DOM.x)


            });

            this.drawn = true;
        }
    }

    componentDidMount() {
        const { getConfig, exitConfig, graphData } = this.props
        getConfig('brief')
    }


    start = (network) => {
        console.log('clicked  ' + network)
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

        var appData = []

        var nodeDetails = JSON.stringify(config[entry], null, 4)
        var tabOneTitle = "应用"
        var tabTwoTitle = "开放端口"
        var tabThreeTitle = "漏洞"

        if (!_.isEmpty(nodeDetails)) {
            console.log('node details  ' + (nodeDetails))
            var hostIP = JSON.parse(nodeDetails).ip
            var osInfo = JSON.parse(nodeDetails).os_info
            var services = JSON.parse(nodeDetails).services
            var openPorts = JSON.parse(nodeDetails).ports

            if (!_.isEmpty(services)) {
                var numOfService = services.length
                for (var i = 0; i < numOfService; i++) {
                    var serviceArray = services[i].split(",")
                    appData.push({
                        port: serviceArray[0],
                        protocol: serviceArray[1],
                        service: serviceArray[2],
                    });
                }
                tabOneTitle = tabOneTitle + "  ( " + i + " )"

            }

            if (!_.isEmpty(openPorts)) {

                tabTwoTitle = tabTwoTitle + "  ( " + openPorts.split(',').length + " )"

            }


        }

        return (

            <div style={{ height: '100%', background: '#fff', padding: '10px', paddingBottom: '30px' }}>
                <div>
                    <Button size='small' onClick={this.start}>网段</Button>
                    <Button size='small' style={{ marginLeft: '10px' }}>威胁程度</Button>
                    <Button size='small' style={{ marginLeft: '10px' }}>资产权重</Button>
                </div>
                <div id="topo" style={{ height: '100%' }}>

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
                            <TabPane tab={tabOneTitle} key="1">
                                <Table style={{ padding: "10px", paddingTop: "0" }}
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

