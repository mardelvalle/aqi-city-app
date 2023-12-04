import React from 'react'
import { render, screen } from '@testing-library/react'
import ResetButton from '../components/ResetButton'

const mockCities = {
  tokyo: {},
  perth: {},
  budapest: {},
  'my location': {},
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
})
