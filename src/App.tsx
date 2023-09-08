import './App.css';
import { SearchBox } from './components/SearchBox';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={true} />
			<div className="absolute w-full h-full bg-slate-100 ">
				<div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
					<SearchBox />
				</div>
			</div>
		</QueryClientProvider>
	);
}

export default App;
