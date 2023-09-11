import React, { useState } from 'react';
import { Results } from './Results';
import { SearchInput } from './SearchInput';
import { MovieQuery } from './MovieQuery';

function SearchBox() {
	const [searchString, setSearchString] = useState('');
	const { isLoading, isError, data } = MovieQuery(searchString);

	const handleEnter = (inputValue: string) => {
		setSearchString(inputValue);
	};

	const handleKeydown = (inputValue: string) => {
		setSearchString(inputValue);
	};

	return (
		<div className="min-w-[600px] min-h-[200px]  bg-slate-100 border-grey border-[1px] shadow-md inline-block p-10 mb-10">
			<SearchInput enterCallback={handleEnter} keydownCallback={handleKeydown} />
			{!isError && <Results items={data} max={5} isLoading={isLoading} />}
			{isError && <div>Problem loading search results...</div>}
		</div>
	);
}

export { SearchBox };
