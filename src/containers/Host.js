import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux'
import { getConfig } from '../actions'
import { Table, Icon } from 'antd'

class Host extends PureComponent {

    componentDidMount() {
        const { getConfig } = this.props
        getConfig('ips')
    }
    componentWillReceiveProps(nextProps) {


    }

    render() {
        let { data = [] } = this.props

        data = data.map(itm => {
            return {
                ip: itm,
                key: itm

            }
        })

        const columns = [{
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip'
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">Delete</a>
                </span>
            ),
        }]


        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}


export default connect(
    state => ({ data: _.get(state, 'config.ips', []) }),
    { getConfig: getConfig }
)(Host)
