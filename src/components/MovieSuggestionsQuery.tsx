import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_URL } from './../constants';
import type { Movie } from './movie';

function MovieSuggestionsQuery(searchString: string): { suggestionsLoading: boolean; suggestionsResult: string[] } {
	function fetchMovies() {
		return axios
			.get(QUERY_URL + searchString, {
				timeout: 3000,
			})
			.then((res) => {
				const movieData: Movie[] = res.data;
				return movieData;
			})
			.catch(function (error) {
				switch (error.code) {
					case 'ECONNABORTED':
						console.log('Aborted, search request took too long');
						break;
					case 'ERR_NETWORK':
						console.log('Aborted, could not connect to server');
						break;
					default:
						console.log(error.code + ': ' + error.message);
				}
			});
	}
	const query = useQuery({
		queryKey: ['search', searchString],
		queryFn: fetchMovies,
		enabled: Boolean(searchString),
	});

	const rawData = query.data;
	const suggestionsLoading = query.isLoading;

	// Make sure returned data is only type of Array<Movie>
	let suggestionsResult: Array<string> = [];
	if (rawData !== undefined) {
		suggestionsResult = rawData.map((item) => {
			return item.name;
		});
	}

	return { suggestionsLoading, suggestionsResult };
}

export { MovieSuggestionsQuery };
