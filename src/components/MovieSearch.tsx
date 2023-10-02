import React, { useState } from 'react';
import { InputWithSuggestions } from './ui';
import { MovieResults } from './MovieResults';
import { MovieQuery, MovieSuggestionsQuery } from '../queries';

function MovieSearch() {
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
		<div className="w-[800px] min-h-[200px]  bg-slate-100 border-grey border-[1px] shadow-md inline-block p-10 mb-10">
			<label
				className="relative top-3 mr-10 inline-block font-extrabold text-transparent mb-[20px] text-5xl 
        bg-clip-text bg-gradient-to-r from-purple-400 to-slate-300"
			>
				Search Movie
			</label>
			<InputWithSuggestions
				onSubmit={handleQuerySearch}
				onSuggestionSubmit={handleQuerySuggestions}
				suggestions={suggestionsResult}
			/>

			<MovieResults items={data} max={999} isLoading={isLoading} isError={isError} />
		</div>
	);
}

export { MovieSearch };