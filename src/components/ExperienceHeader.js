import React from 'react' 
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Tag from './Tag'

const ExperienceHeader = ({project}) => {
    
    const subtitle = project.type === 'professional' ? project.position : project.platform
    
    return (
        <Row className='exp-header'>
            <Col xs={12}>
                <h4>
                    {project.name + ', ' + subtitle}
                    <Tag type={project.type} />
                </h4>
            </Col>
        </Row>
    )
}

export default ExperienceHeader