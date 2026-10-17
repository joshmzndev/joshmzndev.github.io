import { render, screen } from '@testing-library/react';
import App from './App';
import projects from './projects';

test('renders name and description', () => {
  render(<App />);
  expect(screen.getByText('Josh Manzano')).toBeInTheDocument();
  expect(screen.getByText(/software engineer and AP Instructor/i)).toBeInTheDocument();
});

test('social links are labelled', () => {
  render(<App />);
  expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/joshmzndev');
});

test('renders a clickable card for each project', () => {
  render(<App />);
  projects.forEach((project) => {
    const card = screen.getByText(project.title).closest('a');
    expect(card).toHaveAttribute('href', project.href);
    expect(card).toHaveAttribute('target', '_blank');
  });
});
