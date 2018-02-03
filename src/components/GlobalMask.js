import React, { Component } from 'react'
import { Spin } from 'antd'

import style from './GlobalMask.css'

export default (props) => {
    return (
        <div className='GlobalMask' style={{ display: props.visible ? 'flex' : 'none' }}>
            <Spin delay={500} />
        </div>
    )
}
