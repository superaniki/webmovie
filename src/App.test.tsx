import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// https://github.com/testing-library/react-testing-library

test('First test', () => {
	render(<App />);
	const linkElement = screen.getByText(/Funkar/i);
	expect(linkElement).toBeInTheDocument();
});
