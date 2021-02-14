import React from 'react'
import Container from 'react-bootstrap/Container'
import Blurb from './components/Blurb'
import Experience from './components/Experience'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
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
