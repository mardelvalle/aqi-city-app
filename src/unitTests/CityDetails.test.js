import React from 'react'
import { render, screen } from '@testing-library/react'
import CityDetails from '../components/CityDetails'

const mockCities = {
  budapest: {
    data: {
      aqi: 22,
    city: {
        name: 'Hungary',
      },
      time: {
        iso: '2023-11-01T12:34:56Z',
      },
    },
    color: 'green',
    level: 'Good',
  },
  tokyo: {},
  'user location': {
    data: {
      city: {
        name: 'User City',
      },
      aqi: 42,
      time: {
        iso: '2023-12-01T12:34:56Z',
      },
    },
    color: 'yellow',
    level: 'Moderate',
  },
}

describe('CityDetails component', () => {
  test('renders loading state', () => {
    render(<CityDetails cities={{}} lastSelectedCity="tokyo" loading={true} />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  test('renders user city details', () => {
    render(
      <CityDetails
        cities={mockCities}
        lastSelectedCity="user location"
        loading={false}
      />
    )

    expect(screen.getByText('User City')).toBeInTheDocument()
    expect(screen.getByText(/42/)).toBeInTheDocument()
    expect(screen.getByLabelText(/yellow/)).toBeInTheDocument()
    expect(screen.getByText(/Moderate/)).toBeInTheDocument()
    expect(screen.getByText(/December/)).toBeInTheDocument()
  })

    test('renders configured city details', () => {
    render(
      <CityDetails
        cities={mockCities}
        lastSelectedCity="budapest"
        loading={false}
      />
    )

    expect(screen.getByText('Budapest')).toBeInTheDocument()
    expect(screen.getByText(/22/)).toBeInTheDocument()
    expect(screen.getByLabelText(/green/)).toBeInTheDocument()
    expect(screen.getByText(/Good/)).toBeInTheDocument()
    expect(screen.getByText(/November/)).toBeInTheDocument()
  })

  test('renders user city details', () => {
    render(
      <CityDetails
        cities={mockCities}
        lastSelectedCity="user location"
        loading={false}
      />
    )

    expect(screen.getByText('User City')).toBeInTheDocument()
    expect(screen.getByText(/42/)).toBeInTheDocument()
    expect(screen.getByLabelText(/yellow/)).toBeInTheDocument()
    expect(screen.getByText(/Moderate/)).toBeInTheDocument()
    expect(screen.getByText(/December/)).toBeInTheDocument()
  })

  test('renders no data state', () => {
    render(
      <CityDetails
        cities={mockCities}
        lastSelectedCity="tokyo"
        loading={false}
      />
    )

    expect(screen.getByTestId('city-details')).toBeInTheDocument()
  })
})