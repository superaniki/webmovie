import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input, InputWithSuggestions } from './components/ui/';

import { server } from './mocks/server';
import { MovieSearch } from './components/MovieSearch';
import { INPUT_PLACEHOLDER_TEXT, SEARCH_DELAY } from './constants';

describe('Search Input', () => {
	it('triggers a search query after typing "starwars" and hitting enter', () => {
		const mockSearchQuery = jest.fn();
		render(<Input onSubmit={mockSearchQuery} />);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);

		userEvent.type(input, 'starwars');
		userEvent.type(input, '{enter}');

		expect(mockSearchQuery).toHaveBeenCalledWith('starwars');
	});

	it('trigger suggestion query when entering a letter', async () => {
		const mockSuggestionsQuery = jest.fn();
		render(<InputWithSuggestions onSuggestionSubmit={mockSuggestionsQuery} suggestions={[]} />);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);
		userEvent.type(input, 's');
		await new Promise((res) => setTimeout(res, SEARCH_DELAY));
		expect(mockSuggestionsQuery).toHaveBeenCalledWith('s');
	});
});

describe('Search Box', () => {
	beforeAll(() => server.listen());
	afterEach(() => { server.resetHandlers() });
	afterAll(() => server.close());

	it('loads 5 suggestions when entering "w" into search field', async () => {
		const queryClient = new QueryClient();

		render(<QueryClientProvider client={queryClient}>
			<MovieSearch />
		</QueryClientProvider>
		);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);
		userEvent.type(input, 'w');

		await waitFor(() => {
			expect(screen.getAllByRole("listitem").length).toBe(5);
		});
	});
});


