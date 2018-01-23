import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Table } from 'antd';

const Dashboard = () => {
    return <div style={{height:'100%'}}>

            <Row type="flex" justify="start" style={{height:'495px'}} gutter={20}>
                <Col span={17}>
                    <div style={{height:'400px' }}>
                        <Row type="flex" justify="start" style={{height:'105px'}} gutter={20}>
                            <Col span={8}>
                                <div style={{background:'#fff', height:'85px' } }>
                                    <Row  type="flex" justify="start" style={{height:'500px'}}>
                                        <Col span={8} style={{background:'#528ee2', height:'85px'}}>
                                            
                                        </Col>
                                    </Row>
                                </div>      
                            </Col>
                            <Col span={8}>
                            <div style={{background:'#fff', height:'85px' } }>
                                <Row  type="flex" justify="start" style={{height:'500px'}}>
                                    <Col span={8} style={{background:'#f4d58c', height:'85px'}}>
                                        
                                    </Col>
                                </Row>
                            </div>      
                            </Col>
                            <Col span={8}>
                            <div style={{background:'#fff', height:'85px' } }>
                                <Row  type="flex" justify="start" style={{height:'500px'}}>
                                    <Col span={8} style={{background:'#d46d55', height:'85px'}}>
                                        
                                    </Col>
                                </Row>
                            </div>      
                            </Col>
                        </Row> 
                        <Row type="flex" justify="start" style={{height:'370px'}} gutter={20}>
                            <Col span={24}>
                                <div style={{background:'#fff', height:'370px' } }>
                                 
                                </div>      
                            </Col>
                        </Row> 
                    </div>      
                </Col>
                <Col span={7}>
                    <div style={{background:'#fff', height:'475px' }}>
                        <Col>
                            <Row type="flex" justify="start" style={{height:'30px', padding:'10px'}} >
                                
                            </Row>
                            <Row type="flex" justify="start" style={{height:'445px', padding:'10px'}} >
                                
                                <div>

                                </div>
                                
                            </Row>                           
                        </Col>
                    </div>  
                </Col>
            </Row>  

            <Row type="flex" justify="start" style={{height:'300px'}} gutter={20}>
                <Col span={12}>
                    <div style={{background:'#fff', height:'300px' } }>
                        
                    </div>      
                </Col>
                <Col span={12}>
                    <div style={{background:'#fff', height:'300px' }}>
                        
                    </div>  
                </Col>
            </Row>    

    </div>
}

export default Dashboard