import './App.css';
import { SearchBox } from './components/SearchBox';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/*<ReactQueryDevtools initialIsOpen={true} />*/}
			<div className="absolute w-full min-h-full h-auto bg-slate-200 ">
				<div className="relative text-center mt-10 ">
					<SearchBox />
				</div>
			</div>
		</QueryClientProvider>
	);
}

export default App;
