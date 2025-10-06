import { Outlet, NavLink } from 'react-router-dom'
import Preferences from './components/Preferences.jsx'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#content">Saltar al contenido</a>
      <header role="banner">
        <nav aria-label="Principal" className="nav">
          <ul>
            <li><NavLink to="/" end>Inicio</NavLink></li>
            <li><NavLink to="/about">Sobre mí</NavLink></li>
            <li><NavLink to="/contact">Contacto</NavLink></li>
          </ul>
          <Preferences />
        </nav>
      </header>
      <main id="content" role="main">
        <Outlet />
      </main>
       <footer role="contentinfo">
         <p>© 2025 Mariana Marín. Todos los derechos reservados. | <a href="/privacy" className="footer-link">Política de Privacidad</a></p>
       </footer>
    </div>
  )
}

export default App
