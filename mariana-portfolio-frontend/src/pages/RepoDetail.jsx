import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8081/api'

export default function RepoDetail() {
  const { name } = useParams()
  const [repo, setRepo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/repos/${encodeURIComponent(name)}`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Error cargando repositorio')))
      .then(setRepo)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [name])

  if (loading) return <p role="status">Cargando…</p>
  if (error) return <p role="alert">{error}</p>
  if (!repo) return <p role="status">Sin datos</p>

  return (
    <article aria-labelledby="repo-title">
      <header>
        <h1 id="repo-title">{repo.name}</h1>
        <p>{repo.description}</p>
        <p>
          <a href={repo.htmlUrl} target="_blank" rel="noreferrer">Ver en GitHub</a>
        </p>
      </header>
      <section>
        <h2>Detalles</h2>
        <dl className="meta">
          <div>
            <dt>Lenguaje</dt>
            <dd>{repo.language || '—'}</dd>
          </div>
          <div>
            <dt>Stars</dt>
            <dd>{repo.stargazersCount}</dd>
          </div>
          <div>
            <dt>Actualizado</dt>
            <dd>{new Date(repo.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
      </section>
      <p>
        <Link to="/">Volver</Link>
      </p>
    </article>
  )
}


