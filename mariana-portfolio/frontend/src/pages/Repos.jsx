import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8081/api'

export default function Repos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState('updated')
  const [direction, setDirection] = useState('desc')

  useEffect(() => {
    const params = new URLSearchParams()
    if (language) params.set('language', language)
    if (type) params.set('type', type)
    if (sort) params.set('sort', sort)
    if (direction) params.set('direction', direction)
    setLoading(true)
    fetch(`${API_BASE}/repos?${params.toString()}`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Error cargando repositorios')))
      .then(setRepos)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [language, type, sort, direction])

  const languages = useMemo(() => {
    const set = new Set(repos.map(r => r.language).filter(Boolean))
    return Array.from(set).sort()
  }, [repos])

  return (
    <section aria-labelledby="repos-title">
      <div className="hero" role="region" aria-label="Presentación">
        <p className="eyebrow">Mariana Marín</p>
        <h1 id="repos-title" className="hero-title">Full‑Stack Developer</h1>
        <p className="hero-sub">Diseño interfaces creativas, accesibles y pensadas para los usuarios.</p>
        <div className="cta">
          <a className="btn" href="https://github.com/marianamarinflor622" target="_blank" rel="noreferrer">GitHub</a>
          <Link className="btn btn-ghost" to="/contact">Contacto</Link>
        </div>
      </div>

      <h2 id="repos-title">Repositorios</h2>
      <p>Explora mis proyectos, filtra por lenguaje o tipo y ordénalos.</p>

      <form aria-label="Filtros" className="filters" onSubmit={e => e.preventDefault()}>
        <label>
          <span>Lenguaje</span>
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">Todos</option>
            {languages.map((l, index) => (
              <option key={l || `lang-${index}`} value={l}>{l}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Tipo</span>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Todos</option>
            <option value="source">Originales</option>
            <option value="fork">Forks</option>
            <option value="archived">Archivados</option>
          </select>
        </label>
        <label>
          <span>Orden</span>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="updated">Actualizado</option>
            <option value="created">Creado</option>
            <option value="pushed">Push</option>
            <option value="full_name">Nombre</option>
          </select>
        </label>
        <label>
          <span>Dirección</span>
          <select value={direction} onChange={e => setDirection(e.target.value)}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </label>
      </form>

      {loading && <p role="status">Cargando…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && repos.length === 0 && <p>No hay resultados. Ajusta los filtros.</p>}

      <ul className="repo-list">
        {repos.map(repo => (
          <li key={repo.fullName} className="repo-card">
            <h2>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Ver repositorio ${repo.name} en GitHub`}
              >
                {repo.name}
              </a>
            </h2>
          </li>
        ))}
      </ul>
    </section>
  )
}


