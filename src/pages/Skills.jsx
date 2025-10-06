import styles from '../styles/Skills.module.css'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['HTML5', 'CSS3', 'Sass', 'Bootstrap', 'React', 'Styled Components', 'CSS Modules']
    },
    {
      title: 'Backend',
      skills: ['Java 17', 'Spring Boot', 'REST APIs', 'Spring Security', 'JWT', 'Maven']
    },
    {
      title: 'Bases de Datos',
      skills: ['PostgreSQL', 'SQL', 'Normalización', 'Relaciones']
    },
    {
      title: 'Ciberseguridad',
      skills: ['OWASP Top 10', 'Inyecciones SQL/XSS', 'JWT Attacks', 'DVWA', 'BurpSuite']
    },
    {
      title: 'QA / Testing',
      skills: ['Manual y Automatizado', 'Playwright']
    },
    {
      title: 'UX/UI / Diseño',
      skills: ['Atomic Design', 'Figma', 'Wireframes', 'Prototipado', 'Accesibilidad']
    },
    {
      title: 'Metodologías Ágiles',
      skills: ['Jira', 'Trello', 'Scrum', 'Kanban', 'Historias de Usuario']
    },
    {
      title: 'IA Aplicada',
      skills: ['Optimización de Flujos', 'Generación de Código', 'Testing Asistido', 'Documentación']
    }
  ]

  return (
    <section aria-labelledby="skills-title" className={styles.skillsSection}>
      <h2 id="skills-title">Habilidades Técnicas</h2>
      
      <div className={styles.skillsGrid}>
        {skillCategories.map((category, index) => (
          <div key={index} className={styles.skillCard}>
            <h3 className={styles.skillCardTitle}>{category.title}</h3>
            <ul>
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
