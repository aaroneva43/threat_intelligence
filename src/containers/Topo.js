import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import _ from 'lodash'


class Topo extends PureComponent {

    componentDidMount() {

        const { getConfig, exitConfig } = this.props
        
        const me = this

        var graphData = [
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







// -------------- graph code begin ---------------------------------------------
      
        var nodes = null;
        var edges = null;
        var network = null;

        // Called when the Visualization API is loaded.

        // Create a data table with nodes.
        nodes = [];
        
        for( var i = 0; i < graphData.length; i++){
            var nodeData = graphData[i]
            
            var color = null

            if( (nodeData.vulns.critical == 0) && (nodeData.vulns.high == 0) 
                && (nodeData.vulns.medium == 0) && (nodeData.vulns.low == 0) ){
                color = '#689962'
            } else if ( (nodeData.vulns.critical == 0) && (nodeData.vulns.high == 0) 
                && (nodeData.vulns.medium == 0) && (nodeData.vulns.low > 0)
            ){
                color = '#5088d5'
            }

            nodes.push({
                id: graphData[i].ip, 
                label: graphData[i].ip,
                shape: "dot",
                color: color,
                fixed: false, 
                physics:false
            });
        
        }
        // Create a data table with links.
        edges = [];

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
    state => ({ config: _.get(state, 'config', {}) }),
    { getConfig: getConfig, exitConfig: exitConfig }
)(Topo)
