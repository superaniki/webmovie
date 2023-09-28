import React, { useState } from 'react';
import { SearchInput } from './ui/SearchInput';
import { MovieResults } from './MovieResults';
import { MovieQuery } from '../queries/MovieQuery';
import { MovieSuggestionsQuery } from '../queries/MovieSuggestionsQuery';

function SearchBox() {
	const [searchString, setSearchString] = useState('');
	const [suggestionsString, setSuggestionsString] = useState('');

	const { isLoading, isError, data } = MovieQuery(searchString);
	const { suggestionsResult } = MovieSuggestionsQuery(suggestionsString);

	const handleQuerySearch = (inputValue: string) => {
		setSearchString(inputValue);
	};

	const handleQuerySuggestions = (inputValue: string) => {
		setSuggestionsString(inputValue);
	};

	return (
		<div className="min-w-[800px] min-h-[200px]  bg-slate-100 border-grey border-[1px] shadow-md inline-block p-10 mb-10">
			<SearchInput
				querySearchCallback={handleQuerySearch}
				querySuggestionsCallback={handleQuerySuggestions}
				suggestions={suggestionsResult}
			/>
			<MovieResults items={data} max={999} isLoading={isLoading} isError={isError} />
		</div>
	);
}

export { SearchBox };
