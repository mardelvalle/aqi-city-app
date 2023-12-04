import React from 'react'
import { render, screen } from '@testing-library/react'
import AQITable from '../components/AQITable'

describe('AQITable component', () => {
  test('renders AQITable component', () => {
    render(<AQITable />)

    expect(screen.getByText('AQI')).toBeInTheDocument()
    expect(screen.getByText('Air Pollution Level')).toBeInTheDocument()
    expect(screen.getByText('Health Implications')).toBeInTheDocument()
    expect(screen.getByText(/Cautionary Statement/)).toBeInTheDocument()

    expect(screen.getByText('0 - 50')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
    expect(screen.getByText(/little or no risk/)).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()

    expect(screen.getByTestId('aqin-link')).toBeInTheDocument()
  })
})