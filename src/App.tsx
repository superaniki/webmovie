import './App.css';
import { MovieSearch } from './components/MovieSearch';
import { Container } from './components/ui';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Container>
				<MovieSearch />
			</Container>
		</QueryClientProvider>
	);
}

export default App;
