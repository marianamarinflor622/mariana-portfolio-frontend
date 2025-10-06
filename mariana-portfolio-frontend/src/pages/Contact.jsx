import { useState } from 'react'
import config from '../config/env'
import { validateFieldSecurity, sanitizeInput } from '../utils/security'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [messageLength, setMessageLength] = useState(0)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    captcha: ''
  })
  

  function validateField(fieldName, value) {
    const options = {
      name: { maxLength: 100, fieldDisplayName: 'El nombre' },
      email: { maxLength: 254, fieldDisplayName: 'El email' },
      message: { maxLength: 2000, fieldDisplayName: 'El mensaje' },
      captcha: { maxLength: 10, fieldDisplayName: 'La respuesta' }
    };
    
    return validateFieldSecurity(fieldName, value, options[fieldName] || {});
  }

  function handleInputChange(fieldName, value) {
    const error = validateField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
  }
  
  async function onSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    const form = e.currentTarget
    const name = sanitizeInput(form.elements.name.value.trim())
    const email = sanitizeInput(form.elements.email.value.trim())
    const message = sanitizeInput(form.elements.message.value.trim())
    const honeypot = form.elements.honeypot.value.trim()
    const captcha = sanitizeInput(form.elements.captcha.value.trim())
    
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
    
    // Validar todos los campos antes del envío
    const currentErrors = {
      name: validateField('name', name),
      email: validateField('email', email),
      message: validateField('message', message),
      captcha: validateField('captcha', captcha)
    }
    
    setErrors(currentErrors)
    
    const hasErrors = Object.values(currentErrors).some(Boolean)
    if (hasErrors) {
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
        await response.json()
        setSubmitStatus('success')
        form.reset()
        setMessageLength(0)
        setErrors({
          name: '',
          email: '',
          message: '',
          captcha: ''
        })
      } else {
        await response.json().catch(() => ({ error: 'Error desconocido' }))
        setSubmitStatus('error')
      }
    } catch (error) {
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
            <input 
              id="name" 
              name="name" 
              type="text" 
              required 
              autoComplete="name" 
              aria-describedby="name-error" 
              aria-invalid={errors.name ? 'true' : 'false'}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <p id="name-error" role="alert" aria-live="polite" className="error-message">
              {errors.name}
            </p>

            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              autoComplete="email" 
              aria-describedby="email-error" 
              aria-invalid={errors.email ? 'true' : 'false'}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <p id="email-error" role="alert" aria-live="polite" className="error-message">
              {errors.email}
            </p>

            <label htmlFor="message">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              required 
              maxLength="2000"
              aria-describedby="message-error message-help" 
              aria-invalid={errors.message ? 'true' : 'false'}
              onChange={(e) => {
                setMessageLength(e.target.value.length)
                handleInputChange('message', e.target.value)
              }}
            ></textarea>
            <p 
              id="message-help" 
              className={`char-counter ${
                messageLength > 1800 ? 'error' : 
                messageLength > 1500 ? 'warning' : ''
              }`}
            >
              {messageLength}/2000 caracteres
            </p>
            <p id="message-error" role="alert" aria-live="polite" className="error-message">
              {errors.message}
            </p>
            
            {/* Captcha simple */}
            <label htmlFor="captcha">¿Cuánto es 2 + 3?</label>
            <input 
              id="captcha" 
              name="captcha" 
              type="number" 
              required 
              aria-describedby="captcha-error" 
              aria-invalid={errors.captcha ? 'true' : 'false'}
              placeholder="Respuesta"
              onChange={(e) => handleInputChange('captcha', e.target.value)}
            />
            <p id="captcha-error" role="alert" aria-live="polite" className="error-message">
              {errors.captcha}
            </p>
            
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


