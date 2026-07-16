import { useState, useEffect, useRef } from 'react'
import './ContactModal.css'

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ACTIVATE THE FORM:
// 1. Go to https://web3forms.com/
// 2. Enter: marpxstudio@gmail.com  →  Click "Create Access Key"
// 3. Check your Gmail inbox → copy the Access Key
// 4. Paste it below replacing YOUR_ACCESS_KEY_HERE
// 5. That's it — form will send emails directly to marpxstudio@gmail.com
// ─────────────────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => modalRef.current?.querySelector('input')?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
      setError('')
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Enquiry from ${formData.name} — Marpx AI Website`,
          from_name: 'Marpx AI Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          service: formData.service || 'Not specified',
          message: formData.message,
          redirect: false,
          botcheck: '',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' })
      } else {
        setError(
          data.message ||
          'Something went wrong. Please try again or contact us directly.'
        )
      }
    } catch (err) {
      setError(
        'Network error. Please check your connection or email us directly at marpxstudio@gmail.com'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" ref={modalRef}>
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {submitted ? (
          <div className="modal__success">
            <div className="modal__success-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 20l6 6 10-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Message Received!</h3>
            <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            <div className="modal__contact-details">
              <a href="tel:+918072917432">📞 +91 80729 17432</a>
              <a href="mailto:marpxstudio@gmail.com">✉ marpxstudio@gmail.com</a>
            </div>
            <button className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal__header">
              <span className="eyebrow">Let's Talk</span>
              <h2 id="modal-title">Get in Touch</h2>
              <p>Tell us about your project. We'll respond within 24 hours.</p>
              <div className="modal__contact-links">
                <a href="tel:+918072917432">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.35 11.7 19.79 19.79 0 01.27 2.09 2 2 0 012.23 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +91 80729 17432
                </a>
                <a href="mailto:marpxstudio@gmail.com">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  marpxstudio@gmail.com
                </a>
              </div>
            </div>

            <form className="modal__form" onSubmit={handleSubmit}>
              {/* Honeypot spam protection */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-email">Email *</label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-phone">Phone</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-company">Company</label>
                  <input
                    id="modal-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-service">Service of Interest</label>
                <select
                  id="modal-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service...</option>
                  <option value="AI Automation Workflows">AI Automation Workflows</option>
                  <option value="General AI Services">General AI Services</option>
                  <option value="AI Agents">AI Agents</option>
                  <option value="Autonomous & Multi-Agent Systems">Autonomous &amp; Multi-Agent Systems</option>
                  <option value="Custom AI Development">Custom AI Development</option>
                  <option value="AI Consulting & Training">AI Consulting &amp; Training</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="modal-message">Tell us about your project *</label>
                <textarea
                  id="modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you looking to automate or build with AI? What's your timeline?"
                  rows={4}
                  required
                />
              </div>

              {/* Error display */}
              {error && (
                <div className="form-error" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary modal__submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-dots">
                    Sending<span>.</span><span>.</span><span>.</span>
                  </span>
                ) : (
                  <>Send Message <span className="arrow-icon">→</span></>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
