import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AccordionAdmin from '../AccordionAdmin';

vi.mock('@/components/services/accordionServices', () => ({
  accordionServices: {
    getAllSections: async () => [
      { id: 1, title: 'Test Section', content: 'Some content', category: 'general', display_order: 1, is_active: true }
    ],
    createSection: async () => ({ id: 2 }),
    updateSection: async () => ({}),
    deleteSection: async () => ({}),
  }
}));

describe('AccordionAdmin', () => {
  it('renders admin page and lists fetched sections', async () => {
    render(<AccordionAdmin />);

    await waitFor(() => expect(screen.getByText(/Test Section/i)).toBeInTheDocument());
    expect(screen.getByText(/Accordion Management/i)).toBeInTheDocument();
  });
});
