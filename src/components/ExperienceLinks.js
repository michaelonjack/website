import React from 'react' 
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ExperienceLinks = ({links}) => {
    return (
        <Row className='lighter-text'>
            <Col xs={12}>
                <h5>
                    {
                        links.map((link, index) => 
                            <a 
                                key={index} 
                                className='exp-link'
                                target='blank' 
                                href={link.url}
                            >{link.label}</a>
                        )
                    }
                </h5>
            </Col>
        </Row>
    )
}

export default ExperienceLinks