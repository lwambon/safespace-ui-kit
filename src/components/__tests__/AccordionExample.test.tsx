import React from 'react';
import { render, screen } from '@testing-library/react';
import AccordionExample from '../AccordionExample';

describe('AccordionExample', () => {
  it('renders headings and accordion components', () => {
    render(<AccordionExample />);
    expect(screen.getByText(/Help & Support/i)).toBeInTheDocument();
    expect(screen.getByText(/General Help/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency Resources/i)).toBeInTheDocument();
  });
});
