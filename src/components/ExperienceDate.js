import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ExperienceDate = ({project}) => {
    const dates = project.type === 'professional' 
        ? project.startDate + ' - ' + project.endDate 
        : project.date

    return (
        <Row className='lighter-text'>
            <Col xs={12}>
                <p className='item-dates'>
                    {dates}
                </p>
            </Col>
        </Row>
    )
}

export default ExperienceDate