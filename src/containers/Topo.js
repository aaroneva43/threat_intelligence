import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import _ from 'lodash'


class Topo extends PureComponent {
    componentWillReceiveProps(nextProps) {
        const { graphData } = nextProps

        if (!_.isEmpty(graphData)) {



            const me = this

            // var graphData = [
            //     {
            //       "deviceType": "Host", 
            //       "ip": "172.16.0.2", 
            //       "key": "172.16.0.2", 
            //       "numOfApps": 3, 
            //       "numOfOpenPorts": 4, 
            //       "osType": "Ubuntu 16.04", 
            //       "route": "192.168.3.2,192.168.3.1,172.16.0.2", 
            //       "vulns": {
            //         "critical": 0, 
            //         "high": 0, 
            //         "low": 0, 
            //         "medium": 0
            //       }
            //     }, 
            //     {
            //       "deviceType": "Host", 
            //       "ip": "192.168.1.69", 
            //       "key": "192.168.1.69", 
            //       "numOfApps": 6, 
            //       "numOfOpenPorts": 8, 
            //       "osType": "Windows 10 Home 16299", 
            //       "route": "192.168.1.78,192.168.1.69", 
            //       "vulns": {
            //         "critical": 0, 
            //         "high": 0, 
            //         "low": 16, 
            //         "medium": 0
            //       }
            //     }, 
            //     {
            //       "deviceType": "Host", 
            //       "ip": "130.207.160.173", 
            //       "key": "130.207.160.173", 
            //       "numOfApps": "", 
            //       "numOfOpenPorts": "", 
            //       "osType": "", 
            //       "route": "", 
            //       "vulns": {
            //         "critical": 0, 
            //         "high": 0, 
            //         "low": 1, 
            //         "medium": 0
            //       }
            //     }, 
            //     {
            //       "deviceType": "Host", 
            //       "ip": "164.67.228.152", 
            //       "key": "164.67.228.152", 
            //       "numOfApps": "", 
            //       "numOfOpenPorts": 2, 
            //       "osType": "CentOS 6", 
            //       "route": "192.168.1.78,75.49.252.1,71.148.134.57,71.145.0.206,12.83.39.145,12.122.114.5,* * *,4.15.122.46,137.164.11.31,137.164.11.0,137.164.11.36,137.164.11.23,* * *,169.232.4.8,169.232.4.53,* * *,164.67.134.252,164.67.228.152", 
            //       "vulns": {
            //         "critical": 0, 
            //         "high": 0, 
            //         "low": 16, 
            //         "medium": 0
            //       }
            //     }, 
            //     {
            //       "deviceType": "Host", 
            //       "ip": "54.192.117.243", 
            //       "key": "54.192.117.243", 
            //       "numOfApps": "", 
            //       "numOfOpenPorts": 2, 
            //       "osType": "", 
            //       "route": "192.168.1.78,75.49.252.1,71.148.134.57,71.145.0.206,12.83.39.145,12.122.137.213,206.121.188.34,* * *,72.21.222.2,* * *,54.192.117.243", 
            //       "vulns": {
            //         "critical": 0, 
            //         "high": 0, 
            //         "low": 10, 
            //         "medium": 0
            //       }
            //     }
            //   ]



            // Create a data table with nodes.
            var nodes = [];
            //====== recieved json data ============/
            var jsonData = {
                "130.207.160.173": {
                    "deviceType": "Host",
                    "ip": "130.207.160.173",
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
                "164.67.228.152": {
                    "deviceType": "Host",
                    "ip": "164.67.228.152",
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
                "172.16.0.2": {
                    "deviceType": "Host",
                    "ip": "172.16.0.2",
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
                "192.168.1.69": {
                    "deviceType": "Host",
                    "ip": "192.168.1.69",
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
                "54.192.117.243": {
                    "deviceType": "Host",
                    "ip": "54.192.117.243",
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
            }

            console.log('json data', jsonData)
            //======recieved json data ends ========/
            function addNodes(nodes) {
                var nodeLabel = '130.207.160.173'

                nodes.push({
                    id: 1,
                    label: nodeLabel,
                    group: 'switch'
                });

                return nodes;

            }

            addNodes(nodes)
            // Create a data table with links.
            var edges = [];
            /*
                    nodes.push({
                        id: 1,
                        label: '192.168.0.1',
                        group: 'switch',
                        value: 10
                    });
                    nodes.push({
                        id: 2,
                        label: '192.168.0.2',
                        group: 'switch',
                        value: 8
                    });
                    nodes.push({
                        id: 3,
                        label: '192.168.0.3',
                        group: 'switch',
                        value: 6
                    });
                    edges.push({
                        from: 1,
                        to: 2,
                        length: LENGTH_MAIN,
                        width: WIDTH_SCALE,
                        //label: '0.71 mbps'
                    });
                    edges.push({
                        from: 1,
                        to: 3,
                        length: LENGTH_MAIN,
                        width: WIDTH_SCALE,
                        //label: '0.55 mbps'
                    });
            
                    // group around 2
                    for (var i = 100; i <= 104; i++) {
                        var value = 1;
                        var width = WIDTH_SCALE;
                        var color = GRAY;
                        var label = null;
            
                        if (i === 103) {
                            value = 5;
                            width = 3;
                        }
                        if (i === 102) {
                            color = RED;
                            //label = 'error';
                        }
            
                        nodes.push({
                            id: i,
                            label: '192.168.0.' + i,
                            group: 'desktop',
                            value: value
                        });
                        edges.push({
                            from: 2,
                            to: i,
                            length: LENGTH_SUB,
                            color: color,
                            fontColor: color,
                            width: width,
                            label: label
                        });
                    }
                    nodes.push({
                        id: 201,
                        label: '192.168.0.201',
                        group: 'desktop',
                        value: 1
                    });
                    edges.push({
                        from: 2,
                        to: 201,
                        length: LENGTH_SUB,
                        color: GRAY,
                        width: WIDTH_SCALE
                    });
            
                    // group around 3
                    nodes.push({
                        id: 202,
                        label: '192.168.0.202',
                        group: 'desktop',
                        value: 4
                    });
                    edges.push({
                        from: 3,
                        to: 202,
                        length: LENGTH_SUB,
                        color: GRAY,
                        width: WIDTH_SCALE
                    });
                    for (var i = 230; i <= 231; i++) {
                        nodes.push({
                            id: i,
                            label: '192.168.0.' + i,
                            group: 'mobile',
                            value: 2
                        });
                        edges.push({
                            from: 3,
                            to: i,
                            length: LENGTH_SUB,
                            color: GRAY,
                            fontColor: GRAY,
                            width: WIDTH_SCALE
                        });
                    }
            
                    // group around 1
                    nodes.push({
                        id: 10,
                        label: '192.168.0.10',
                        group: 'server',
                        value: 10
                    });
                    edges.push({
                        from: 1,
                        to: 10,
                        length: LENGTH_SERVER,
                        color: GRAY,
                        width: WIDTH_SCALE,
                    });
                    nodes.push({
                        id: 11,
                        label: '192.168.0.11',
                        group: 'server',
                        value: 7
                    });
                    edges.push({
                        from: 1,
                        to: 11,
                        length: LENGTH_SERVER,
                        color: GRAY,
                        width: WIDTH_SCALE,
                        //label: '0.68 mbps'
                    });
                    nodes.push({
                        id: 12,
                        label: '192.168.0.12',
                        group: 'server',
                        value: 3
                    });
                    edges.push({
                        from: 1,
                        to: 12,
                        length: LENGTH_SERVER,
                        color: GRAY,
                        width: WIDTH_SCALE,
                        //label: '0.3 mbps'
                    });
            
                    nodes.push({
                        id: 204,
                        label: 'Internet',
                        group: 'internet',
                        value: 10,
                        title: 'I have a popup'
                    });
                    edges.push({
                        from: 1,
                        to: 204,
                        length: 200,
                        width: WIDTH_SCALE,
                        //label: '0.63 mbps'
                    });
            */

            /* legent ------------------------------------------------------
                    var mynetwork = document.getElementById('topo');
                    var x = mynetwork.clientWidth * 3 + 0;
                    var y = mynetwork.clientHeight * 2 + 0;
                    var step = 70;
                
                    console.log('width:  ', x);
                    console.log('height:  ', y);
                
                
                    nodes.push({
                        id: 1000,
                        x: x,
                        y: y,
                        label: 'Internet',
                        group: 'internet',
                        value: 1,
                        fixed: true,
                        physics: false
                    });
                    nodes.push({
                        id: 1001,
                        x: x,
                        y: y + step,
                        label: 'Switch',
                        group: 'switch',
                        value: 1,
                        fixed: true,
                        physics: false
                    });
                    nodes.push({
                        id: 1002,
                        x: x,
                        y: y + 2 * step,
                        label: 'Server',
                        group: 'server',
                        value: 1,
                        fixed: true,
                        physics: false
                    });
                    nodes.push({
                        id: 1003,
                        x: x,
                        y: y + 3 * step,
                        label: 'Computer',
                        group: 'desktop',
                        value: 1,
                        fixed: true,
                        physics: false
                    });
                    nodes.push({
                        id: 1004,
                        x: x,
                        y: y + 4 * step,
                        label: 'Smartphone',
                        group: 'mobile',
                        value: 1,
                        fixed: true,
                        physics: false
                    });
                 */
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

                console.log('ip: ' + JSON.parse(nodeString).nodes);

                const entry = 'app_info/' + JSON.parse(nodeString).nodes
                getConfig(entry)
                me.setState({ entry })


            });
        }
    }

    componentDidMount() {

        const { getConfig, exitConfig, graphData } = this.props


        getConfig('brief')

        // --------------------  graph code end ------------------------------------------------
    }

    render() {

        const { config, exitConfig } = this.props,
            entry = _.get(this.state, 'entry')

        return (
            <div id="topo" style={{ height: '100%', background: '#fff' }}>

                <Modal
                    visible={!!config[entry]}
                    onCancel={() => { exitConfig(entry) }}
                    footer={null}
                    title="设备信息"
                >
                    {JSON.stringify(config[entry])}
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
