import { useState } from 'react'
import config from '../config/env'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  
  function isValidEmail(value) { 
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(value);
  }
  
  async function onSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    const form = e.currentTarget
    const name = form.elements.name.value.trim()
    const email = form.elements.email.value.trim()
    const message = form.elements.message.value.trim()
    const honeypot = form.elements.honeypot.value.trim()
    const captcha = form.elements.captcha.value.trim()
    
    // Validación de honeypot (debe estar vacío)
    if (honeypot) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }
    
    // Validación de captcha simple
    if (captcha !== '5') {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }
    
    const errors = {
      name: name ? '' : 'El nombre es obligatorio.',
      email: email ? (isValidEmail(email) ? '' : 'Introduce un email válido.') : 'El email es obligatorio.',
      message: message ? '' : 'El mensaje es obligatorio.'
    }
    
    const hasErrors = Object.values(errors).some(Boolean)
    if (hasErrors) {
      form.querySelectorAll('[data-error]')?.forEach(el => (el.textContent = ''))
      Object.entries(errors).forEach(([key, msg]) => {
        const errEl = form.querySelector(`#${key}-error`)
        const input = form.elements[key]
        if (errEl) errEl.textContent = msg
        if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false')
      })
      const firstError = Object.entries(errors).find(([, msg]) => msg)
      if (firstError) { form.elements[firstError[0]]?.focus() }
      setIsSubmitting(false)
      return
    }
    
    try {
      const response = await fetch(`${config.API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ip: 'client-side' // El backend obtendrá la IP real
        })
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        // Limpiar errores
        form.querySelectorAll('[data-error]')?.forEach(el => (el.textContent = ''))
        form.querySelectorAll('[aria-invalid]')?.forEach(el => el.setAttribute('aria-invalid', 'false'))
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="contact-title">
      <header className="hero" role="region" aria-label="Contacto">
        <p className="eyebrow">Hablemos</p>
        <h1 id="contact-title" className="hero-title">Contacto</h1>
        <p className="hero-sub">Escríbeme por email o conéctame en redes.</p>
      </header>

      <div className="app" style={{ paddingTop: '1rem' }}>
        <nav className="circle-links" aria-label="Redes de contacto">
          <a className="circle-btn" href="https://www.linkedin.com/in/mariana-marin-1b6268348/" target="_blank" rel="noreferrer" aria-label="Abrir LinkedIn de Mariana" title="LinkedIn">LinkedIn</a>
          <a className="circle-btn" href="https://github.com/marianamarinflor622" target="_blank" rel="noreferrer" aria-label="Abrir GitHub de Mariana" title="GitHub">GitHub</a>
          <a className="circle-btn" href="mailto:infomarianamarin@gmail.com" aria-label="Enviar email a Mariana" title="Email">Email</a>
        </nav>

        <div className="contact-grid">
          <form className="form" aria-describedby="contact-help" onSubmit={onSubmit} noValidate onInput={(e) => {
            const t = e.target
            if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return
            const id = t.id
            if (!id) return
            const val = t.value
            let msg = ''
            if (id === 'name') { msg = val.trim() ? '' : 'El nombre es obligatorio.' }
            if (id === 'email') { msg = val.trim() ? (/.+@.+\..+/.test(val) ? '' : 'Introduce un email válido.') : 'El email es obligatorio.' }
            if (id === 'message') { msg = val.trim() ? '' : 'El mensaje es obligatorio.' }
            const errEl = document.getElementById(`${id}-error`)
            if (errEl) errEl.textContent = msg
            t.setAttribute('aria-invalid', msg ? 'true' : 'false')
          }}>
            <p id="contact-help">Todos los campos son obligatorios.</p>
            
            {/* Campo honeypot oculto para bots */}
            <input 
              id="honeypot" 
              name="honeypot" 
              type="text" 
              style={{ display: 'none' }} 
              tabIndex="-1" 
              autoComplete="off"
              aria-hidden="true"
            />
            
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" required autoComplete="name" aria-describedby="name-error" aria-invalid="false" />
            <p id="name-error" data-error role="alert" aria-live="polite"></p>

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" aria-describedby="email-error" aria-invalid="false" />
            <p id="email-error" data-error role="alert" aria-live="polite"></p>

            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" required aria-describedby="message-error" aria-invalid="false"></textarea>
            <p id="message-error" data-error role="alert" aria-live="polite"></p>
            
            {/* Captcha simple */}
            <label htmlFor="captcha">¿Cuánto es 2 + 3?</label>
            <input 
              id="captcha" 
              name="captcha" 
              type="number" 
              required 
              aria-describedby="captcha-error" 
              aria-invalid="false"
              placeholder="Respuesta"
            />
            <p id="captcha-error" data-error role="alert" aria-live="polite"></p>
            
            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
              <div role="alert" className="success-message" style={{ 
                background: '#d4edda', 
                color: '#155724', 
                padding: '1rem', 
                borderRadius: '4px', 
                marginBottom: '1rem',
                border: '1px solid #c3e6cb'
              }}>
                ✅ Mensaje enviado correctamente. Te responderé pronto.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div role="alert" className="error-message" style={{ 
                background: '#f8d7da', 
                color: '#721c24', 
                padding: '1rem', 
                borderRadius: '4px', 
                marginBottom: '1rem',
                border: '1px solid #f5c6cb'
              }}>
                ❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo.
              </div>
            )}

            <button 
              className="btn" 
              type="submit" 
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}


