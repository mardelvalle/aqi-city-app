import React from 'react'
import { render, screen } from '@testing-library/react'
import ResetButton from '../components/ResetButton'

const mockCities = {
  tokyo: {},
  perth: {},
  budapest: {},
  'user location': {},
}

describe('ResetButton component', () => {
  test('renders button with correct text and icon', () => {
    render(
      <ResetButton
        cities={mockCities}
        isMobile={false}
        setCities={() => {}}
        setResetTriggered={() => {}}
      />
    )

    expect(screen.getByTestId('reload')).toBeInTheDocument()
    expect(screen.getByTestId('reload-icon')).toBeInTheDocument()
  })

  test('applies styles based on isMobile', () => {
    render(
      <ResetButton
        cities={mockCities}
        isMobile={true}
        setCities={() => {}}
        setResetTriggered={() => {}}
      />
    )

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveStyle({
      fontSize: '1.25rem',
      padding: '0.75rem 8.5rem',
    })
  })
})
