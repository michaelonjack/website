import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import HeaderLink from './HeaderLink'
import ThemeButton from './ThemeButton'

const Header = () => {
    return (
        <header>
            <ThemeButton />
            <Row style={{paddingTop: '80px'}}>
                <Col xs={12} className='text-center'>
                    <img 
                        className='profile-img' 
                        src={process.env.PUBLIC_URL + '/me.png'}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} className='text-center normal-text'>
                    <h1>Michael Onjack</h1>
                </Col>
            </Row>
            <Row className='lightest-text' style={{marginTop: '1em'}}>
                <Col sm={2} md={3} lg={4} className='d-none d-sm-block'></Col>
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Row>
                        <HeaderLink title='Github' url='https://github.com/michaelonjack' />
                        <HeaderLink title='App Store' url='https://apps.apple.com/us/developer/michael-onjack/id1203555930' />
                        <HeaderLink title='Email' url='mailto:mikeonjack@gmail.com' />
                    </Row>
                </Col>
                <Col sm={2} md={3} lg={4} className='d-none d-sm-block'></Col>
            </Row>
        </header>
    )
}

export default Header