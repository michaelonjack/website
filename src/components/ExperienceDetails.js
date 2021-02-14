import React from 'react' 
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ExperienceDetails = ({details}) => {
    return (
        <Row className='list-row light-text'>
            <Col xs={12}>
                <ul className='item-list'>
                    {
                        details.map((d,index) =>
                            <li key={index}>{d}</li>
                        )
                    }
                </ul>
            </Col>
        </Row>
    )
}

export default ExperienceDetails