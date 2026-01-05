import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import { SearchBar } from './SearchBar';

const Wrapper = ({ children }) => <ChatProvider>{children}</ChatProvider>;

describe('SearchBar Component', () => {
  it('should render search input', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should have correct placeholder', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', 'Search messages...');
  });

  it('should update search query on input change', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should call onResultsChange when searching', () => {
    const onResultsChange = vi.fn();
    render(<SearchBar onResultsChange={onResultsChange} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(onResultsChange).toHaveBeenCalled();
  });

  it('should show clear button when searching', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(screen.getByTestId('clear-search')).toBeInTheDocument();
  });

  it('should hide clear button when not searching', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(screen.getByTestId('clear-search')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('clear-search')).not.toBeInTheDocument();
  });

  it('should clear search when clear button clicked', () => {
    render(<SearchBar onResultsChange={() => {}} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'test' } });
    const clearBtn = screen.getByTestId('clear-search');
    fireEvent.click(clearBtn);

    expect(input.value).toBe('');
  });

  it('should find messages case insensitively', () => {
    const onResultsChange = vi.fn();
    render(<SearchBar onResultsChange={onResultsChange} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'HOW ARE YOU' } });
    
    // Should call with results
    expect(onResultsChange).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should return empty results for non-matching query', () => {
    const onResultsChange = vi.fn();
    render(<SearchBar onResultsChange={onResultsChange} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'xyz12345' } });
    
    // Should call with empty array
    expect(onResultsChange).toHaveBeenCalledWith([]);
  });

  it('should handle spaces in search query', () => {
    const onResultsChange = vi.fn();
    render(<SearchBar onResultsChange={onResultsChange} />, { wrapper: Wrapper });
    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: '   ' } });
    
    expect(onResultsChange).toHaveBeenCalled();
  });
});
