import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Blurb = () => {
    return (
        <Row className='light-text'>
            <Col xs={0} sm={1}></Col>
            <Col xs={12} sm={10} className='text-center blurb' style={{marginTop: '3em'}}>
            Software engineer living in <a target="blank" href="https://goo.gl/maps/PFEVytKWjHhfhcNz9">Arlington, Virginia</a>. Currently employed by <a target="blank" href="https://www.omnisystems.com/">OmniSystems</a> in McLean, Virginia. Graduated from Penn State University with a major in Computer Science and a minor in Mathematics. I enjoy building iOS apps and wondering what my dog is thinking.
            </Col>
            <Col xs={0} sm={1}></Col>
        </Row>
    )
}

export default Blurb