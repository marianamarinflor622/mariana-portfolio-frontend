export default function Contact() {

  return (
    <section aria-labelledby="contact-title">
      <header className="hero" role="region" aria-label="Contacto">
        <p className="eyebrow">Hablemos</p>
        <h1 id="contact-title" className="hero-title">Contacto</h1>
        <p className="hero-sub">Conéctate conmigo a través de mis redes sociales</p>
      </header>

      <div className="app" style={{ paddingTop: '2rem' }}>
        <div className="contact-info" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>¿Tienes alguna pregunta o quieres colaborar?</h2>
          <p style={{ marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Me encantaría conocer tu proyecto y ver cómo puedo ayudarte. 
            Puedes contactarme a través de cualquiera de mis redes sociales o enviarme un email directamente.
          </p>
          
          <nav className="circle-links" aria-label="Redes de contacto" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a 
              className="circle-btn" 
              href="https://www.linkedin.com/in/mariana-marin-1b6268348/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Abrir LinkedIn de Mariana" 
              title="LinkedIn"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              LinkedIn
            </a>
            <a 
              className="circle-btn" 
              href="https://github.com/marianamarinflor622" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Abrir GitHub de Mariana" 
              title="GitHub"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              GitHub
            </a>
            <a 
              className="circle-btn" 
              href="mailto:infomarianamarin@gmail.com" 
              aria-label="Enviar email a Mariana" 
              title="Email"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              Email
            </a>
          </nav>
          
          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
            <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Información de contacto</h3>
            <p style={{ margin: '0.5rem 0', color: '#6c757d' }}>
              <strong>Email:</strong> infomarianamarin@gmail.com
            </p>
            <p style={{ margin: '0.5rem 0', color: '#6c757d' }}>
              <strong>LinkedIn:</strong> Mariana Marín
            </p>
            <p style={{ margin: '0.5rem 0', color: '#6c757d' }}>
              <strong>GitHub:</strong> @marianamarinflor622
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


