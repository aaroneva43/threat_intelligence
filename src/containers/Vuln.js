import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'
import css from './Vuln.scss'
import { Tabs } from 'antd'

import _ from 'lodash'

class Vuln extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('vuln_summary')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props
        const TabPane = Tabs.TabPane
console.log('vulns   ' + data)
        const columns = [{
            title: '名称',
            dataIndex: 'vulnName',
            key: 'vulnName',
            width: 500
        }, {
            title: '严重程度',
            dataIndex: 'severity',
            key: 'severity',
            width: 80,
            className: 'column-center_align'
        },{
            title: '存在数量',
            dataIndex: 'numOfInstances',
            key: 'numOfInstances',
            width: 80,
            className: 'column-right_align'
        }, {
            title: '所属操作系统／应用',
            dataIndex: 'belongTo',
            key: 'belongTo',
            width: 300,
           
        }]

        return (
            <div style={{ height: '100%', background: '#fff'}}>
                <div style={{marginTop: "0px", marginLeft: "20px",marginRight: "20px",marginBottom: "20px"}}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab= '全部' key="1">

                        
                            <Table 
                                columns={columns}
                                bordered
                                dataSource={data}
                                expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                                size="small"
                                pagination={{ hideOnSinglePage:true }}
                                scroll={{x: 960}}                          
                            />
                        

                        </TabPane>
                        <TabPane tab='严重' key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>

                </div>
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.vuln_summary', []) }),
    { getConfig: getConfig }
)(Vuln)

/*
            <div style={{ height: '100%', background: '#fff'}}>
                <div style={{marginTop: "0px", marginLeft: "20px",marginRight: "20px",marginBottom: "20px"}}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab= '全部' key="1">

                        
                            <Table 
                                columns={columns}
                                bordered
                                dataSource={data}
                                expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                                size="small"
                                pagination={{ hideOnSinglePage:true }}
                                scroll={{x: 960, y:400 }}                          
                            />
                        

                        </TabPane>
                        <TabPane tab='严重' key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>

                </div>
            </div>

*/