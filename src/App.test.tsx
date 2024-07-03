import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('is App rendered', () => {
  render(<App />);
  const currencyConverter = screen.getByText("currencyConverter");
  expect(currencyConverter).toBeInTheDocument();
});
