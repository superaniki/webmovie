import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Results } from './Results';
import { SearchInput } from './SearchInput';
import axios from 'axios';
import type { Movie } from './movie';
import { toast } from 'react-hot-toast';

function SearchBox() {
	const queryUrl = 'https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies?q=';
	const [searchString, setSearchString] = useState('');

	function getMovies() {
		return axios
			.get(queryUrl + searchString)
			.then((res) => {
				const movieData: Movie[] = res.data;
				return movieData;
			})
			.catch(function (error) {
				toast.error('Error: ' + error.code);
			});
	}

	const { isLoading, error, isError, data } = useQuery({
		queryKey: ['search', searchString],
		queryFn: getMovies,
		enabled: Boolean(searchString),
	});

	if (isError) {
		console.log('error', error);
		return <div>something went wrong</div>;
	}

	if (error) {
		console.log('Error: ' + error);
		toast.error('Error: ' + error);
	}

	const handleEnter = (inputValue: string) => {
		setSearchString(inputValue);
	};

	let resultsData: Movie[] = [];

	if (data !== undefined) {
		resultsData = data;
	}

	return (
		<div className="min-w-[600px] min-h-[200px] bg-white border-grey border-[1px] shadow-md inline-block p-10">
			<SearchInput enterCallback={handleEnter} />
			<Results items={resultsData} max={5} isLoading={isLoading} />
		</div>
	);
}

export { SearchBox };
