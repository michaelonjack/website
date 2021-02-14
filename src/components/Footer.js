import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Footer = () => {
    return (
        <Row style={{margin: '5em 0 5em 0'}}>
            <Col xs={12} className='text-center'>
                <button id='high-five-button'>
                ✋
                </button>
                <br />
                Thanks for reading!
            </Col>
        </Row>
    )
}

export default Footer