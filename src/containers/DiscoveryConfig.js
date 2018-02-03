import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig, setConfig, postConfig, delConfig } from '../actions'
import { Table, Icon, Input, Popconfirm } from 'antd'
import { Tabs } from 'antd'
import EditableCell from '../components/EditableCell'
// import css from './DiscoveryConfig.scss'


import _ from 'lodash'

class DiscoveryConfig extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('ip_blocks')
    }
    componentWillReceiveProps(nextProps) {

    }





    render() {
        let { getConfig, setConfig, postConfig, delConfig, data = [] } = this.props;


        // add operation row (to add)
        if (!data.find(itm => itm.key == '_add')) {
            setConfig('ip_blocks', { data: [...data, { ip: '', key: '_add', editable: true }] });;
        }

        const handleChange = (value, key, column) => {
            const newData = [...data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
                target[column] = value;
                // this.setState({ data: newData });
                setConfig('ip_blocks', { data: newData });;
            }
        }

        // const EditableCell = ({ editable, value, onChange }) => (
        //     <div>
        //         {editable
        //             ? <input key={'_add'} style={{ margin: '-5px 0' }} value={value} onChange={(e) => { handleChange(e.target.value, '_add', 'ip') }} />
        //             : value
        //         }
        //     </div>
        // )

        const edit = (key) => {
            const newData = [...data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
                target.editable = true;
                this.setState({ data: newData });
            }
        }
        const save = (key) => {
            const r = _.get(this.props, 'data', []).find(itm => itm.key === key);

            if (!_.isEmpty(r)) {
                postConfig('ip_block', { data: { ip_block: r.ip } })
            }
        }
        const cancel = (key) => {
            const r = _.get(this.props, 'data', []).find(itm => itm.key === key);

            if (!_.isEmpty(r)) {
                delConfig('ip_block', { data: { ip_block: r.ip } })
            }
        }

        const columns = [{
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
            width: 80,
            render: (text, record, index) => {
                return (
                    <EditableCell
                        key={record.key}
                        editable={record.editable}
                        value={text}
                        onChange={value => handleChange(value, record.key, 'ip')}
                    />
                );
            }
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editable, key } = record;
                return (
                    <div className="editable-row-operations">
                        {

                            (() => {

                                let rslt;

                                if (key == '_add') {
                                    rslt = <span>
                                        <a onClick={() => save(record.key)}>+</a>

                                    </span>;
                                } else {
                                    rslt = <span>
                                        <a onClick={() => cancel(record.key)}>-</a>

                                    </span>;
                                }

                                return rslt;

                            })()

                        }
                    </div>
                );
            },
        }];





        return (

            <div style={{ height: '100%', background: '#fff', padding: "20px" }}>
                <div style={{ paddingBottom: "10px" }}><span style={{ fontWeight: 600 }}>网段设置</span></div>
                <Table style={{ height: '100%', width: "600px", position: "relative", top: '0px', bottom: '0px' }}
                    columns={columns}
                    bordered
                    dataSource={data}
                    size="small"
                    //scroll={{ x: 600 }}
                    pagination={{ hideOnSinglePage: true }}
                />

            </div>

        )
    }
}

export default connect(
    state => ({ data: _.get(state, 'config.ip_blocks', []) }),
    { getConfig: getConfig, setConfig: setConfig, postConfig: postConfig, delConfig: delConfig }
)(DiscoveryConfig)




