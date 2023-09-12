import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from './components/ui/SearchInput';
import { INPUT_PLACEHOLDER_TEXT, SEARCH_DELAY } from './constants';

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
