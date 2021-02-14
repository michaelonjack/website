import React, {useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ThemeButton = () => {
    const setTheme = (light = true) => {
        const themeButton = document.getElementById('theme-button')
    
        if(light) {
            document.body.setAttribute('data-theme', 'light')
            themeButton.innerText = '🌙'
        } else {
            document.body.setAttribute('data-theme', 'dark')
            themeButton.innerText = '☀️'
        }
    }

    const toggleTheme = () => {
        const isLight = document.body.getAttribute('data-theme') === 'light'
        setTheme(!isLight)

        localStorage.setItem('michaelonjack.com_theme', document.body.getAttribute('data-theme'))
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('michaelonjack.com_theme');
        const defaultIsLight = !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
        setTheme(storedTheme ? storedTheme === 'light' : defaultIsLight)
    }, [])

    return (
        <Row className='text-right'>
            <Col xs={12}>
                <button id='theme-button' onClick={toggleTheme}>
                    🌙
                </button>
            </Col>
        </Row>
    )
}

export default ThemeButton