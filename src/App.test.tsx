import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from './components/ui/SearchInput';
import { SearchBox } from './components/SearchBox';

import { INPUT_PLACEHOLDER_TEXT, SEARCH_DELAY } from './constants';
import { server } from './mocks/server';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Search Input', () => {
	it('triggers a search query when pressing enter', () => {
		const mockSearchQuery = jest.fn();
		render(<SearchInput querySuggestionsCallback={() => {}} querySearchCallback={mockSearchQuery} />);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);

		userEvent.type(input, 'starwars');
		userEvent.type(input, '{enter}');

		expect(mockSearchQuery).toHaveBeenCalledWith('starwars');
	});

	it('trigger suggestion query when entering a letter', async () => {
		const mockSuggestionsQuery = jest.fn();
		render(<SearchInput querySuggestionsCallback={mockSuggestionsQuery} querySearchCallback={() => {}} />);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);
		userEvent.type(input, 's');
		await new Promise((res) => setTimeout(res, SEARCH_DELAY));
		expect(mockSuggestionsQuery).toHaveBeenCalledWith('s');
	});
});

describe('Search Box', () => {
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('loads 5 suggestions when entering "w" into search field ', async () => {
		const queryClient = new QueryClient();

		render(	<QueryClientProvider client={queryClient}>
							<SearchBox />
				</QueryClientProvider>
			);
		const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER_TEXT);
		userEvent.type(input, 'w');

		waitFor(() => {
			let items = screen.getAllByRole("suggestion");
			expect(screen.getAllByRole("suggestion").length).toBe(5);
		});
	});
});


