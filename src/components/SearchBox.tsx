import React /*{ useEffect, useState }*/ from 'react';
import { useQuery } from 'react-query';
import { Results } from './Results';

function SearchBox() {
	const { isLoading, error, data } = useQuery('repoData', () =>
		fetch('https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies').then((res) => res.json())
	);

	if (isLoading) return 'Loading...';

	if (error) {
		console.log('error' + error);
		return 'error';
	}

	console.log('data: ' + JSON.stringify(data));

	return (
		<div className="min-w-[400px] min-h-[200px] bg-white border-grey border-[1px] shadow-md inline-block">
			<Results items={data} max={5} />
		</div>
	);
}

export { SearchBox };
