import React from 'react'
import { render, screen } from '@testing-library/react'
import LocationButton from '../components/LocationButton'

const mockTheme = {
  palette: {
    primary: {
      main: '#007bff'
    },
  },
}

describe('LocationButton component', () => {
  test('renders button with correct text', () => {
    render(
      <LocationButton
        city="tokyo"
        fetchData={() => {}}
        isMobile={false}
        lastSelectedCity="budapest"
        theme={mockTheme}
      />
    )

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveTextContent('Tokyo')
  })
})