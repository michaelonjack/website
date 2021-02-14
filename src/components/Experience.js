import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ExperienceItem from './ExperienceItem'
import data from '../data'

const Experience = () => {

    return (
        <>
        <Row className='lightest-text'>
            <Col xs={12}>
                <h3>RECENT WORK</h3>
            </Col>
        </Row>
        {
            data.projects.map((project, index) => [
                <ExperienceItem 
                    key={index} 
                    project={project} 
                />
            ])
        }
        </>
    )
}

export default Experience