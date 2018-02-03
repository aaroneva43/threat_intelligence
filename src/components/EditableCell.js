import React, { PureComponent, createElement } from 'react'
import { Table, Icon, Input, Popconfirm } from 'antd'
// import css from './DiscoveryConfig.scss'


import _ from 'lodash'

class EditableCell extends PureComponent {

    render() {

        const { editable, value, onChange } = this.props;



        return (<div>
            {editable
                ? <input style={{ margin: '-5px 0' }} value={value} onChange={(e) => { onChange(e.target.value, '_add', 'ip') }} />
                : value
            }
        </div>)
    }
}

export default EditableCell;




