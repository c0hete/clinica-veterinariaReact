import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-vh-100">
        <Router />
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
