import { Link } from 'react-router-dom'
import logo from '../assets/MarpxLogo.png'
import './Footer.css'

export default function Footer({ onContactOpen }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={logo} alt="Marpx AI" />
              <span>Marpx <em>AI</em></span>
            </Link>
            <p>We don't just talk AI.<br />We build it — end to end.</p>
            <div className="footer__social">
              <a href="https://www.linkedin.com/in/murugayesu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/MarpxAI" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:marpxstudio@gmail.com" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Services</h4>
              <Link to="/services#automation">AI Automation</Link>
              <Link to="/services#general">General AI Services</Link>
              <Link to="/services#agents">AI Agents</Link>
              <Link to="/services#multi-agent">Multi-Agent Systems</Link>
              <Link to="/services#custom">Custom AI Dev</Link>
              <Link to="/services#consulting">AI Consulting</Link>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/#why">Why Us</Link>
              <Link to="/#faq">FAQ</Link>
              <button onClick={onContactOpen} className="footer__link-btn">Get in Touch</button>
            </div>
            <div className="footer__col">
              <h4>Contact</h4>
              <a href="tel:+918072917432">+91 80729 17432</a>
              <a href="mailto:marpxstudio@gmail.com">marpxstudio@gmail.com</a>
              <button className="btn-primary footer__cta" onClick={onContactOpen}>
                Start a Project →
              </button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {year} Marpx AI. All rights reserved.</p>
          <p className="footer__tagline">Built with intelligence. Delivered with precision.</p>
        </div>
      </div>
    </footer>
  )
}
