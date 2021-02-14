import React from 'react'
import Container from 'react-bootstrap/Container'
import Blurb from './components/Blurb'
import Experience from './components/Experience'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  if(process.env.REACT_APP_ENV !== 'development'
    && window.location.protocol !== 'https:') {
    const protocol = window.location.protocol
    const href = window.location.href
    window.location.replace(`https:${href.substring(protocol.length)}`)
  }

  return (
    <Container fluid>
      <Header />
      <Blurb />
      <Experience />
      <Footer />
    </Container>
  )
}

export default App
