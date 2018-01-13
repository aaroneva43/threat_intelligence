import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
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
        }
    }

    componentDidMount() {
        const { getConfig, exitConfig, graphData } = this.props
        getConfig('brief')        
    }

    render() {

        const { config, exitConfig } = this.props,
            entry = _.get(this.state, 'entry')

            var nodeDetails = JSON.stringify(config[entry], null, 4)
            if(!_.isEmpty(nodeDetails)) {

                var os_info = JSON.parse(nodeDetails).os_info 
                console.log('nodeDetails.os_info  '+ os_info)
            }
        return (
     
            <div id="topo" style={{ height: '100%', background: '#fff' }}>

                <Modal
                    visible={!!config[entry]}
                    onCancel={() => { exitConfig(entry) }}
                    footer={null}
                    title="设备信息"
                >
                    <div>
                        {os_info}
                    </div>
                  
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
