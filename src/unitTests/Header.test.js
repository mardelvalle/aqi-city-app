import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

describe('Header component', () => {
  test('renders logo and title', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
  })
})