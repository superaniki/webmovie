import axios from 'axios';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { QUERY_URL } from './../constants';
import type { Movie } from '../movie';

function MovieQuery(searchString: string): { isLoading: boolean; error: unknown; isError: boolean; data: Movie[] } {
	function fetchMovies() {
		return axios
			.get(QUERY_URL + searchString, {
				timeout: 10000,
			})
			.then((res) => {
				const movieData: Movie[] = res.data;
				return movieData;
			})
			.catch(function (error) {
				switch (error.code) {
					case 'ECONNABORTED':
						toast.error('Aborted, search request took too long');
						break;
					case 'ERR_NETWORK':
						toast.error('Aborted, could not connect to server');
						break;
					default:
						toast.error(error.code + ': ' + error.message);
				}
			});
	}
	const query = useQuery({
		queryKey: ['search', searchString],
		queryFn: fetchMovies,
		enabled: Boolean(searchString),
	});

	const { isLoading, error, isError } = query;
	const rawData = query.data;

	// Make sure returned data is only type of Array<Movie>
	let data: Array<Movie> = [];
	if (rawData !== undefined) {
		data = rawData;
	}

	return { isLoading, error, isError, data };
}

export { MovieQuery };
