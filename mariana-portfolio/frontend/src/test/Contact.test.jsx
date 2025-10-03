import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../pages/Contact';

// Mock fetch
global.fetch = vi.fn();

describe('Contact Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders contact form correctly', () => {
    render(<Contact />);
    
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  it('shows validation errors for empty form', async () => {
    render(<Contact />);
    
    // Fill in captcha first to avoid that validation
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '5' } });
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El mensaje es obligatorio')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '5' } });
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Introduce un email válido')).toBeInTheDocument();
    });
  });

  it('successfully submits form with valid data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Mensaje enviado correctamente' }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '5' } });
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('✅ Mensaje enviado correctamente. Te responderé pronto.')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:8081/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.stringContaining('"name":"Test User"'),
    });
  });

  it('handles API error gracefully', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Error interno del servidor' }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '5' } });
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    });
  });

  it('validates captcha correctly', async () => {
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '3' } }); // Wrong answer
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo.')).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Mensaje enviado correctamente' }),
    });

    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Test message' } });
    fireEvent.change(screen.getByLabelText('¿Cuánto es 2 + 3?'), { target: { value: '5' } });
    
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('✅ Mensaje enviado correctamente. Te responderé pronto.')).toBeInTheDocument();
    });

    // Check that form is reset
    expect(screen.getByLabelText('Nombre')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Mensaje')).toHaveValue('');
  });
});
