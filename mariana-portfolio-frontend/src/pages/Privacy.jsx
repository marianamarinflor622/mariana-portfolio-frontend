import styles from '../styles/Privacy.module.css'

export default function Privacy() {
  return (
    <article aria-labelledby="privacy-title" className={styles.privacyPage}>
      <header className={styles.privacyHeader}>
        <h1 id="privacy-title">Política de Privacidad</h1>
        <p className={styles.privacySubtitle}>Mariana Marín · Portfolio</p>
        <p className={styles.privacyDate}>Fecha de actualización: 3 de octubre de 2025</p>
      </header>

      <div className={styles.privacyContent}>
        <section>
          <p className={styles.privacyIntro}>
            En Mariana Marín · Portfolio, nos tomamos muy en serio la privacidad de nuestros visitantes. 
            Esta política describe cómo recopilamos, utilizamos y protegemos la información personal 
            que nos proporcionas a través de nuestro sitio web.
          </p>
        </section>

        <section>
          <h2>1. Información que recopilamos</h2>
          <ul>
            <li>Datos que proporcionas voluntariamente, por ejemplo, mediante el formulario de contacto, como tu nombre y correo electrónico.</li>
            <li>Información no personal recopilada automáticamente, como datos de navegación mediante cookies u otras tecnologías de análisis.</li>
          </ul>
        </section>

        <section>
          <h2>2. Uso de la información</h2>
          <ul>
            <li>Responder consultas o mensajes enviados a través del formulario de contacto.</li>
            <li>Mejorar la experiencia del usuario y optimizar el sitio web.</li>
            <li>Analizar estadísticas de uso para comprender cómo se utiliza el sitio.</li>
          </ul>
        </section>

        <section>
          <h2>3. Compartir información</h2>
          <ul>
            <li>No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley o proteger derechos legales.</li>
            <li>Los proveedores de servicios que ayudan a mantener el sitio pueden tener acceso limitado a la información necesaria para prestar sus servicios, pero siempre bajo obligación de confidencialidad.</li>
          </ul>
        </section>

        <section>
          <h2>4. Seguridad</h2>
          <ul>
            <li>Implementamos medidas técnicas y organizativas razonables para proteger la información personal contra pérdida, acceso no autorizado, uso indebido o divulgación.</li>
            <li>Sin embargo, ningún método de transmisión por Internet o almacenamiento digital es 100% seguro.</li>
          </ul>
        </section>

        <section>
          <h2>5. Tus derechos</h2>
          <ul>
            <li>Puedes solicitar acceso, corrección o eliminación de tus datos personales contactándonos a través del formulario del sitio o por correo electrónico.</li>
            <li>Puedes retirar tu consentimiento para el uso de tus datos en cualquier momento.</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <ul>
            <li>El sitio puede usar cookies para mejorar la experiencia del usuario y recopilar información estadística de forma anónima.</li>
            <li>No se usan cookies para recopilar información personal sensible sin tu consentimiento explícito.</li>
          </ul>
        </section>

        <section>
          <h2>7. Cambios en la política</h2>
          <p>Podemos actualizar esta política de privacidad ocasionalmente. Te recomendamos revisar esta página periódicamente.</p>
        </section>

        <section>
          <h2>8. Contacto</h2>
          <p>
            Si tienes preguntas o inquietudes sobre nuestras políticas de privacidad, puedes contactarnos 
            mediante el formulario de contacto del sitio web.
          </p>
        </section>
      </div>
    </article>
  )
}
