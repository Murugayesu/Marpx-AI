import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { serviceCategories } from '../data/services'
import './Home.css'

/* ---- Scroll Reveal Hook ---- */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ---- Hero Particles Canvas ---- */
function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 192, 192, ${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(192, 192, 192, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}

/* ---- FAQ Item ---- */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-item__header">
        <p className="faq-item__q">{q}</p>
        <span className="faq-item__icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </div>
      <div className="faq-item__body">
        <p>{a}</p>
      </div>
    </div>
  )
}

const faqs = [
  { q: 'What types of businesses do you work with?', a: 'We work with businesses of all sizes — from ambitious startups to established enterprises. If you have repetitive work, data you\'re not using, or customer interactions that could be smarter, we can help. We\'re industry-agnostic and results-obsessed.' },
  { q: 'How quickly can I expect to see results?', a: 'Most clients see a working pilot within 2–4 weeks. We move fast, test early, and scale only what\'s proven. You\'ll see ROI from the first automation, not months down the line.' },
  { q: 'Do I need to have technical knowledge or data ready?', a: 'Not at all. We start by understanding your business, not your tech stack. We work with what you have, design around your existing systems, and handle all the technical heavy lifting.' },
  { q: 'How is Marpx AI different from other AI companies?', a: 'We build, not just consult. We\'re workflow specialists first — we understand how businesses actually operate and find the 5% of AI opportunities worth building. Every solution is custom-built for your specific needs, not off-the-shelf tools repackaged.' },
  { q: 'What happens after you deliver the solution?', a: 'We don\'t hand off and vanish. We train your team, monitor the system, and refine until it runs smoothly without us. Long-term support packages are available for ongoing maintenance and evolution.' },
  { q: 'How much does it cost?', a: 'Every engagement is scoped to your needs. We\'ll give you a clear proposal after understanding your requirements — no hourly billing surprises. Reach out to start the conversation.' },
]

const stats = [
  { num: '150+', label: 'Automations Delivered' },
  { num: '40+', label: 'Happy Clients' },
  { num: '10,000+', label: 'Hours Saved Monthly' },
  { num: '15+', label: 'Industries Served' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '5x', label: 'Average ROI' },
]

const testimonials = [
  { quote: 'Marpx AI transformed how we handle customer enquiries. What used to take our team 3 hours every morning is now done automatically before we arrive. The AI handles 80% of tickets without any human intervention.', author: 'Priya M.', role: 'Operations Director, E-commerce Startup' },
  { quote: 'We were skeptical about AI — we\'d tried tools before that just didn\'t deliver. Marpx built us a custom workflow that actually works, and they stuck around to make sure our team was using it. Game changer.', author: 'Rahul S.', role: 'Founder, B2B SaaS Company' },
  { quote: 'The document processing automation alone saves us 20 hours a week. Now we\'re expanding to other areas. The ROI in month one was already 4x what we invested.', author: 'Anita R.', role: 'CFO, Logistics Firm' },
]

export default function Home({ onContactOpen }) {
  useReveal()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - 80 // Adjust offset for navbar
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero__glow" />
        <div className="container hero__content">
          <span className="eyebrow reveal">Premium AI Agency</span>
          <h1 className="hero__headline reveal reveal-delay-1">
            We don't just talk AI.<br />
            <span className="gradient-text">We build it.</span>
          </h1>
          <p className="hero__sub reveal reveal-delay-2">
            We identify the AI opportunities that will actually transform your business,<br className="hide-mobile" />
            then we build it, deploy it, and train your team to use it.
          </p>
          <div className="hero__ctas reveal reveal-delay-3">
            <button className="btn-primary" onClick={onContactOpen}>
              Get in Touch
              <span className="arrow-icon">→</span>
            </button>
            <Link to="/services" className="btn-secondary">
              Explore Services
              <span className="arrow-icon">→</span>
            </Link>
          </div>
          <div className="hero__scroll reveal reveal-delay-4">
            <div className="hero__scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ===== WHY MARPX ===== */}
      <section className="section-padding why-section" id="why">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">The Problem</span>
            <h2>You bought the tools.<br />Read the case studies.<br />Attended the webinars.</h2>
          </div>
          <div className="pain-cards">
            <div className="pain-card reveal reveal-delay-1">
              <p>But months later, the tools sit unused. The pilots never scaled. Nobody can explain what ROI actually looks like.</p>
            </div>
            <div className="pain-card pain-card--highlight reveal reveal-delay-2">
              <p>You're not behind. <strong>You're just stuck in the same place everyone gets stuck.</strong></p>
            </div>
            <div className="pain-card reveal reveal-delay-3">
              <p>Or you're pre-launch — trying to avoid these exact mistakes before you spend another rupee experimenting.</p>
            </div>
          </div>
          <div className="why-answer reveal">
            <div className="gradient-line" style={{ height: 80, margin: '48px auto' }} />
            <h2 className="gradient-text">That's why we built Marpx AI.</h2>
            <p>AI that actually moves the needle. We define what's worth building, build it for you, then train your people to make it stick.</p>
            <p><strong>Stop paying to experiment. Start paying for results.</strong></p>
            <button className="btn-primary" onClick={onContactOpen}>
              Start the Conversation →
            </button>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section-padding process-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">Our Process</span>
            <h2 className="gradient-text">Three things we do every day</h2>
          </div>
          <div className="process-cards">
            {[
              { num: '01', title: 'Assess', icon: '🔍', desc: 'We start by understanding how your team actually works — where time is lost, what slows things down, why work piles up. From there, we identify the AI opportunities that will actually matter.' },
              { num: '02', title: 'Build', icon: '⚡', desc: 'Once we know what matters, we move fast. Our team builds solutions that fit seamlessly into your existing systems — built right from day one, not patched together over time.' },
              { num: '03', title: 'Deploy', icon: '🚀', desc: 'Then we make it real. We work side by side with your team — training, fine-tuning, and integrating until your new AI system is just how work gets done.' },
            ].map((p, i) => (
              <div key={p.num} className={`process-card reveal reveal-delay-${i + 1}`}>
                <div className="process-card__num">{p.num}</div>
                <div className="process-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="section-padding services-overview">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">What We Build</span>
            <h2>Everything your business needs<br /><span className="gradient-text">to run on AI</span></h2>
          </div>
          <div className="services-grid">
            {serviceCategories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/services#${cat.id}`}
                className={`service-overview-card glass-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <span className="service-overview-card__icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
                <p>{cat.tagline}</p>
                <div className="service-overview-card__count">{cat.services.length} services →</div>
              </Link>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: 48 }}>
            <Link to="/services" className="btn-primary">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section">
        <div className="stats-ticker__wrapper">
          <div className="stats-ticker">
            <div className="stats-ticker__track">
              {[...stats, ...stats].map((s, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-item__num">{s.num}</span>
                  <span className="stat-item__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ticker-fade left" />
          <div className="ticker-fade right" />
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">What Clients Say</span>
            <h2>Don't just take our word for it...</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card glass-card reveal reveal-delay-${i + 1}`}>
                <div className="testimonial-card__stars">★★★★★</div>
                <p className="testimonial-card__quote">"{t.quote}"</p>
                <div className="testimonial-card__author">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding faq-section" id="faq">
        <div className="container">
          <div className="section-header reveal">
            <span className="eyebrow">FAQ</span>
            <h2>You've got questions.<br />We've got answers.</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div className="cta-banner__content reveal">
            <h2>AI is here. Most will react.<br /><span className="gradient-text">The few with a plan will lead.</span></h2>
            <p className="cta-banner__sub">We build for those few.</p>
            <button className="btn-primary cta-banner__btn" onClick={onContactOpen}>
              Get in Touch Today →
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
