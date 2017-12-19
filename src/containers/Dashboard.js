import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

const Dashboard = () => {
    return <div>
 
            <Row type="flex" justify="start">
                <Col span={12}>
                    <div style={{background:'#fff' }}>
                        Host
                    </div>      
                </Col>
                <Col span={12}>
                    <div style={{background:'#aaa' }}>
                        Host
                    </div>  
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <div style={{background:'#3eda89' }}>
                         three      
                    </div>            
                </Col>
                <Col span={8}>
                    <div style={{background:'#545454' }}>
                         three      
                    </div>            
                </Col>
                <Col span={8}>
                    <div style={{background:'#919191' }}>
                         three      
                    </div>            
                </Col>
            </Row>
            <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
            </Row>

    </div>
}

export default Dashboard