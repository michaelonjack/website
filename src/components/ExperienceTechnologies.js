import React from 'react' 
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MiniTag from './MiniTag'

const ExperienceTechnologies = ({technologies}) => {
    return (
        <Row>
            <Col xs={12}>
                {
                    technologies.map((t, index) =>
                        <MiniTag key={index} label={t} />   
                    )
                }
            </Col>
        </Row>
    )
}

export default ExperienceTechnologies