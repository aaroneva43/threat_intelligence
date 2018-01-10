import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, exitConfig } from '../actions'
import { Table, Icon, Modal } from 'antd'
import _ from 'lodash'


class Topo extends PureComponent {

    componentDidMount() {

        const { getConfig, exitConfig } = this.props

        const me = this

        var nodes = null;
        var edges = null;
        var network = null;

        var LENGTH_MAIN = 350,
            LENGTH_SERVER = 150,
            LENGTH_SUB = 50,
            WIDTH_SCALE = 2,
            GREEN = 'green',
            RED = '#C5000B',
            ORANGE = 'orange',
            //GRAY = '#666666',
            GRAY = 'gray',
            BLACK = '#2B1B17';

        // Called when the Visualization API is loaded.

        // Create a data table with nodes.
        nodes = [];

        function addNodes(nodes){
          var nodeLabel =  '130.207.160.173'

          nodes.push({
            id: 1,
            label: nodeLabel,
            group: 'switch'
          });

          return nodes;
        
        }

        addNodes(nodes)
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
                color: GRAY,
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
                    color: "#2B7CE9" // blue
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

            const entry = 'app_info/' + '172.16.0.2'
            getConfig(entry)
            me.setState({ entry })
            //document.getElementById('eventSpan');
            //.innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
            // console.log('double click event, getNodeAt returns: ' + JSON.stringify(params, null, 4));
        });

    }


    render() {

        const { config, exitConfig } = this.props,
            entry = _.get(this.state, 'entry')

        return (
            <div id="topo" style={{ height: '100%', background: '#fff' }}>

                <Modal
                    visible={!!config[entry]}
                    onCancel={() => { exitConfig(entry) }}
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
