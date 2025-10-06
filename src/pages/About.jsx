import styles from '../styles/About.module.css'
import Skills from './Skills.jsx'
import profileImage from '../assets/IMG_1112.jpeg'

export default function About() {
  return (
    <article aria-labelledby="about-title">
      <div className={styles.aboutHero}>
        <div className={styles.profileImageContainer}>
          <img 
            src={profileImage} 
            alt="Mariana Marín - Desarrolladora Fullstack" 
            className={styles.profileImage}
          />
        </div>
        <div className={styles.aboutContent}>
                 <header>
                   <h1 id="about-title">Sobre mí</h1>
                   <p className={styles.eyebrow}>MARIANA MARÍN · FULL‑STACK DEVELOPER</p>
                 </header>
                 <section>
                   <p>
                     Soy una persona resolutiva y proactiva, capaz de encontrar soluciones efectivas ante problemas complejos y de anticiparme a las necesidades de cada proyecto. Tengo una fuerte orientación hacia la innovación, combinando creatividad y pensamiento analítico para generar soluciones tecnológicas originales y útiles.
                   </p>
                   <p>
                     Mi formación inicial en Derecho me entrenó en el análisis crítico, la interpretación de normativas y la comunicación clara, habilidades que aplico hoy en ciberseguridad y desarrollo de software, asegurando que las soluciones que diseño cumplan con estándares de seguridad, privacidad y buenas prácticas legales y técnicas.
                   </p>
                   <p>
                     La tecnología siempre ha sido mi gran pasión. Disfruto aprendiendo constantemente y aplicando nuevos conocimientos en proyectos reales, buscando mejorar procesos, interfaces y experiencias. Cada desafío es una oportunidad para crecer personal y profesionalmente, y cada proyecto es una ocasión para aportar valor real.
                   </p>
                   <p>
                     Además, mi compromiso con la inclusión y la accesibilidad digital es profundo. Ser madre de un hijo con autismo me inspiró a crear aplicaciones y experiencias digitales que sirvan como apoyo y soporte para personas con necesidades especiales, asegurando que la tecnología acerque oportunidades a todas las personas, sin barreras.
                   </p>
                   <p>
                     Disfruto del trabajo en equipo, del intercambio de ideas y de construir soluciones que generen un impacto real. Cada reto es una lección y una oportunidad de construir un mundo más justo a través de la tecnología.
                   </p>
                 </section>
        </div>
      </div>
      
      <Skills />
    </article>
  )
}


