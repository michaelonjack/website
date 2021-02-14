import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ExperienceDate from './ExperienceDate'
import ExperienceDetails from './ExperienceDetails'
import ExperienceHeader from './ExperienceHeader'
import ExperienceLinks from './ExperienceLinks'
import ExperienceTechnologies from './ExperienceTechnologies'

const ExperienceItem = ({project}) => {
    return (
        <>
        <ExperienceHeader project={project} />
        <ExperienceLinks links={project.links} />
        <ExperienceDetails details={project.details} />
        <ExperienceTechnologies technologies={project.technologies} />
        <ExperienceDate project={project} />
        </>
    )
}

export default ExperienceItem