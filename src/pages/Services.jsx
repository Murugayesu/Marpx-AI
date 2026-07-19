import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { serviceCategories } from '../data/services'
import './Services.css'

/* ---- Scroll Reveal ---- */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ---- Service Card with Tooltip ---- */
function ServiceCard({ service }) {
  const [active, setActive] = useState(false)
  const cardRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setActive(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`service-card ${active ? 'active' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(!active)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setActive(!active)}
      aria-expanded={active}
    >
      <div className="service-card__front">
        <span className="service-card__icon">{service.icon}</span>
        <h4 className="service-card__name">{service.name}</h4>
        <p className="service-card__short">{service.short}</p>
        <span className="service-card__hint">
          {active ? 'Click to collapse' : 'Hover / tap to learn more'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>

      <div className="service-card__tooltip">
        <div className="tooltip__section">
          <span className="tooltip__label">💡 What it means for you</span>
          <p>{service.plain}</p>
        </div>
        <div className="tooltip__section">
          <span className="tooltip__label">📌 Real Example</span>
          <p>{service.example}</p>
        </div>
        <div className="tooltip__badge">
          <span>Best for:</span>
          <span className="tooltip__best">{service.bestFor}</span>
        </div>
      </div>
    </div>
  )
}

/* ---- Category Section ---- */
function CategorySection({ category }) {
  return (
    <section className="category-section" id={category.id}>
      <div className="category-section__header reveal">
        <div className="category-section__meta">
          <span className="category-section__icon">{category.icon}</span>
          <span className="eyebrow">{`0${categoryIndex(category.id) + 1}`}</span>
        </div>
        <h2>{category.title}</h2>
        <p className="category-section__tagline">{category.tagline}</p>
        <p className="category-section__desc">{category.description}</p>
      </div>
      <div className="category-section__grid">
        {category.services.map((svc, i) => (
          <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`}>
            <ServiceCard service={svc} />
          </div>
        ))}
      </div>
    </section>
  )
}

function categoryIndex(id) {
  return serviceCategories.findIndex(c => c.id === id)
}

export default function Services({ onContactOpen }) {
  useReveal()
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id)

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) {
      const el = document.getElementById(hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
        setActiveCategory(hash)
      }
    }
  }, [location.hash])

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = serviceCategories.map(c => document.getElementById(c.id))
      const scrollY = window.scrollY + 160
      let current = serviceCategories[0].id
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollY) {
          current = section.id
        }
      })
      setActiveCategory(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCategory = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveCategory(id)
    }
  }

  return (
    <main className="services-page" aria-label="Marpx AI Services">
      <Helmet>
        <title>AI Services — Automation, Agents &amp; Custom AI Development | Marpx AI</title>
        <meta name="description" content="Explore Marpx AI's full range of services: AI automation workflows, AI agents, multi-agent systems, custom AI development, and AI consulting. Built for your business." />
        <link rel="canonical" href="https://marpxai.vercel.app/services" />
        <meta property="og:url" content="https://marpxai.vercel.app/services" />
        <meta property="og:title" content="AI Services — Automation, Agents &amp; Custom AI | Marpx AI" />
        <meta name="twitter:url" content="https://marpxai.vercel.app/services" />
      </Helmet>
      {/* Page Header */}
      <div className="services-hero">
        <div className="services-hero__glow" />
        <div className="container">
          <span className="eyebrow reveal">Our Services</span>
          <h1 className="reveal reveal-delay-1">
            Everything you need to<br />
            <span className="gradient-text">run on AI</span>
          </h1>
          <p className="services-hero__sub reveal reveal-delay-2">
            From simple automations to complete multi-agent systems —<br className="hide-mobile" />
            hover or tap any service to see what it means for your business.
          </p>
        </div>
      </div>

      {/* Mobile Category Scroll */}
      <div className="services-mobile-cats" role="navigation" aria-label="Service categories">
        {serviceCategories.map(cat => (
          <button
            key={cat.id}
            className={`mobile-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => scrollToCategory(cat.id)}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div className="services-layout">
        {/* Sticky Sidebar */}
        <aside className="services-sidebar" aria-label="Service categories">
          <div className="services-sidebar__inner">
            <p className="services-sidebar__label">Categories</p>
            <nav>
              {serviceCategories.map((cat, i) => (
                <button
                  key={cat.id}
                  className={`sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => scrollToCategory(cat.id)}
                  aria-current={activeCategory === cat.id ? 'true' : undefined}
                >
                  <span className="sidebar-item__icon">{cat.icon}</span>
                  <span className="sidebar-item__text">{cat.title}</span>
                </button>
              ))}
            </nav>
            <div className="sidebar-cta">
              <p>Not sure where to start?</p>
              <button className="btn-primary" onClick={onContactOpen}>
                Talk to us →
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="services-content">
          {serviceCategories.map(cat => (
            <CategorySection key={cat.id} category={cat} />
          ))}

          {/* Bottom CTA */}
          <div className="services-bottom-cta reveal">
            <h2>Can't find what you're looking for?</h2>
            <p>We build completely custom AI solutions. Tell us what you need and we'll figure it out together.</p>
            <button className="btn-primary" onClick={onContactOpen}>
              Get a Custom Quote →
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
