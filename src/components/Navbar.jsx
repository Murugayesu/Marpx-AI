import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/MarpxLogo.png'
import './Navbar.css'

export default function Navbar({ onContactOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="Marpx AI" />
          <span className="navbar__logo-text">Marpx <span>AI</span></span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' && !location.hash ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/#why" className={location.hash === '#why' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Why Us</Link>
          <Link to="/#faq" className={location.hash === '#faq' ? 'active' : ''} onClick={() => setMenuOpen(false)}>FAQ</Link>
        </nav>

        <div className="navbar__actions">
          <button className="btn-primary navbar__cta" onClick={onContactOpen}>
            Get in Touch
            <span className="arrow-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>

          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <nav>
            <Link to="/" className={location.pathname === '/' && !location.hash ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/#why" onClick={() => setMenuOpen(false)}>Why Us</Link>
            <Link to="/#faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </nav>
          <button className="btn-primary" onClick={() => { onContactOpen(); setMenuOpen(false) }}>
            Get in Touch →
          </button>
        </div>
      )}
    </header>
  )
}
