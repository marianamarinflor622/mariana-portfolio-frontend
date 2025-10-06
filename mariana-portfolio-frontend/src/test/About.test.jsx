import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from '../pages/About';

describe('About Component', () => {
  it('renders about section correctly', () => {
    render(<About />);
    
    expect(screen.getByRole('heading', { name: 'Sobre mí' })).toBeInTheDocument();
    expect(screen.getByText('MARIANA MARÍN · FULL‑STACK DEVELOPER')).toBeInTheDocument();
  });

  it('displays profile image', () => {
    render(<About />);
    
    const profileImage = screen.getByAltText('Mariana Marín - Desarrolladora Fullstack');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/IMG_1112.jpeg');
  });

  it('renders skills section', () => {
    render(<About />);
    
    expect(screen.getByRole('heading', { name: 'Habilidades Técnicas' })).toBeInTheDocument();
  });

  it('displays skill categories', () => {
    render(<About />);
    
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Bases de Datos')).toBeInTheDocument();
    expect(screen.getByText('Ciberseguridad')).toBeInTheDocument();
    expect(screen.getByText('QA / Testing')).toBeInTheDocument();
    expect(screen.getByText('UX/UI / Diseño')).toBeInTheDocument();
    expect(screen.getByText('Metodologías Ágiles')).toBeInTheDocument();
    expect(screen.getByText('IA Aplicada')).toBeInTheDocument();
  });

  it('displays specific skills in each category', () => {
    render(<About />);
    
    // Frontend skills
    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('CSS3')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Backend skills
    expect(screen.getByText('Java 17')).toBeInTheDocument();
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
    expect(screen.getByText('REST APIs')).toBeInTheDocument();
    
    // Database skills
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('SQL')).toBeInTheDocument();
    
    // Security skills
    expect(screen.getByText('OWASP Top 10')).toBeInTheDocument();
    expect(screen.getByText('Inyecciones SQL/XSS')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<About />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'about-title');
    
    const title = screen.getByRole('heading', { name: 'Sobre mí' });
    expect(title).toHaveAttribute('id', 'about-title');
  });

  it('contains the about me content', () => {
    render(<About />);
    
    expect(screen.getByText(/Soy una persona resolutiva y proactiva/)).toBeInTheDocument();
    expect(screen.getByText(/Mi formación inicial en Derecho/)).toBeInTheDocument();
    expect(screen.getByText(/La tecnología siempre ha sido mi gran pasión/)).toBeInTheDocument();
    expect(screen.getByText(/mi compromiso con la inclusión y la accesibilidad digital/)).toBeInTheDocument();
  });
});
