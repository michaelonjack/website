import React from 'react'
import Col from 'react-bootstrap/Col'

const HeaderLink = ({title, url}) => {
    return (
        <Col xs={4} md={4} className='text-center'>
            <a
                href={url}
                target='blank'
                rel='noreferrer noopener nofollow'
            >
                {title}
            </a>
        </Col>
    )
}

export default HeaderLink