import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Repos from '../pages/Repos';

// Mock fetch
global.fetch = vi.fn();

// Helper to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockRepos = [
  {
    name: 'test-repo-1',
    description: 'Test repository 1',
    language: 'JavaScript',
    fork: false,
    archived: false,
    stargazers_count: 5,
    watchers_count: 3,
    forks_count: 2,
    size: 1000,
    full_name: 'testuser/test-repo-1',
    html_url: 'https://github.com/testuser/test-repo-1',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-12-01T00:00:00Z',
    pushed_at: '2023-12-01T00:00:00Z',
    topics: ['javascript', 'react']
  },
  {
    name: 'test-repo-2',
    description: 'Test repository 2',
    language: 'Java',
    fork: false,
    archived: false,
    stargazers_count: 10,
    watchers_count: 7,
    forks_count: 3,
    size: 2000,
    full_name: 'testuser/test-repo-2',
    html_url: 'https://github.com/testuser/test-repo-2',
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-11-01T00:00:00Z',
    pushed_at: '2023-11-01T00:00:00Z',
    topics: ['java', 'spring']
  }
];

describe('Repos Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderWithRouter(<Repos />);
    
    expect(screen.getByText('Cargando…')).toBeInTheDocument();
  });

  it('renders repositories after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Repositorios' })).toBeInTheDocument();
    });

    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();
  });

  it('renders error message when API fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('renders empty state when no repositories', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByText('No hay resultados. Ajusta los filtros.')).toBeInTheDocument();
    });
  });

  it('filters repositories by language', async () => {
    // Mock initial load
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByText('test-repo-1')).toBeInTheDocument();
      expect(screen.getByText('test-repo-2')).toBeInTheDocument();
    });

    // Mock filtered response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockRepos[0]], // Only JavaScript repo
    });

    // Filter by JavaScript
    const languageSelect = screen.getByLabelText('Lenguaje');
    fireEvent.change(languageSelect, { target: { value: 'JavaScript' } });

    await waitFor(() => {
      expect(screen.getByText('test-repo-1')).toBeInTheDocument();
      expect(screen.queryByText('test-repo-2')).not.toBeInTheDocument();
    });
  });

  it('filters repositories by type', async () => {
    const reposWithFork = [
      ...mockRepos,
      {
        name: 'forked-repo',
        description: 'Forked repository',
        language: 'Python',
        fork: true,
        archived: false,
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        size: 500,
        full_name: 'testuser/forked-repo',
        html_url: 'https://github.com/testuser/forked-repo',
        created_at: '2023-03-01T00:00:00Z',
        updated_at: '2023-10-01T00:00:00Z',
        pushed_at: '2023-10-01T00:00:00Z',
        topics: ['python']
      }
    ];

    // Mock initial load
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => reposWithFork,
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByText('test-repo-1')).toBeInTheDocument();
      expect(screen.getByText('test-repo-2')).toBeInTheDocument();
      expect(screen.getByText('forked-repo')).toBeInTheDocument();
    });

    // Mock filtered response for forks only
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [reposWithFork[2]], // Only forked repo
    });

    // Filter to show only forks
    const typeSelect = screen.getByLabelText('Tipo');
    fireEvent.change(typeSelect, { target: { value: 'fork' } });

    await waitFor(() => {
      expect(screen.queryByText('test-repo-1')).not.toBeInTheDocument();
      expect(screen.queryByText('test-repo-2')).not.toBeInTheDocument();
      expect(screen.getByText('forked-repo')).toBeInTheDocument();
    });
  });

  it('makes repository cards clickable', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    });

    const repoCard = screen.getByText('test-repo-1').closest('a');
    expect(repoCard).toHaveAttribute('href', 'https://github.com/testuser/test-repo-1');
    expect(repoCard).toHaveAttribute('target', '_blank');
    expect(repoCard).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper accessibility attributes', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    renderWithRouter(<Repos />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Repositorios' })).toBeInTheDocument();
    });

    const heading = screen.getByRole('heading', { name: 'Repositorios' });
    expect(heading).toHaveAttribute('id', 'repos-title');
  });
});
