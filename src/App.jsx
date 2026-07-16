import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import Home from './pages/Home'
import Services from './pages/Services'
import { useState } from 'react'
import './App.css'

function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Navbar onContactOpen={() => setContactOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onContactOpen={() => setContactOpen(true)} />} />
        <Route path="/services" element={<Services onContactOpen={() => setContactOpen(true)} />} />
      </Routes>
      <Footer onContactOpen={() => setContactOpen(true)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}

export default App
