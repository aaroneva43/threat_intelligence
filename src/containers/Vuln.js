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
        getConfig('brief')
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let { data = [] } = this.props
        const TabPane = Tabs.TabPane

        const columns = [{
            title: '名称',
            dataIndex: '',
            key: 'ip'
        }, {
            title: '严重程度',
            dataIndex: '',
            key: '',
            width: '80px',
            className: 'column-center_align'
        },{
            title: '存在数量',
            dataIndex: 'numOfApps',
            key: '',
            width: '80px',
            className: 'column-right_align'
        }, {
            title: '所属操作系统／应用',
            dataIndex: '',
            key: '',
            width: '350px',
           
        }]

        return (
            <div style={{ height: '100%', background: '#fff'}}>
                <div style={{marginTop: "0px", marginLeft: "20px",marginRight: "20px",marginBottom: "20px"}}>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab= '全部' key="1">
                        
                            <Table style={{ height: '100%'}}
                                columns={columns}
                                bordered
                                dataSource={data}
                                expandedRowRender={record => <div style={{ margin: 5, background: "#fff" }}>{record.osType}</div>}
                                size="small"
                                scroll={{ x: 1140 }}
                            />
                    
                        </TabPane>
                        <TabPane tab='严重' key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab='高' key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab='中' key="4">
                            Content of Tab Pane 4
                        </TabPane>
                        <TabPane tab='低' key="5">
                            Content of Tab Pane 5
                        </TabPane>
                        
                    </Tabs>
                </div>
            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.brief', []) }),
    { getConfig: getConfig }
)(Vuln)


