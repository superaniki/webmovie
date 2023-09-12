import React from 'react';
import type { Movie } from './movie';

type ResultsProps = {
	items: Movie[] | [];
	max?: number;
	isLoading?: boolean;
};

function Results({ items, max = -1, isLoading = false }: ResultsProps) {
	if (isLoading)
		return (
			<div className="lds-ring m-20">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);

	if (!items.length) return <div className="mt-10 text-gray-500 italic bold">No results..</div>;

	const slicedItems = items.slice(0, max);

	function MovieItem({ type, children }: { type: string; children: React.ReactNode }) {
		return (
			<div className="leading-tight pb-1">
				<div className="float-left text-right w-[100px] pr-5 italic text-gray-500">{type}</div>
				<div className="block text-left opacity-80 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[500px]">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div className="">
			<ul className="mt-10">
				{slicedItems.map((item) => {
					return (
						<li className="block mb-8 p-5 bg-white border-slate-300 border-[1px]" key={item.id}>
							<MovieItem type="name">{item.name}</MovieItem>
							<MovieItem type="description">{item.description}</MovieItem>
							<MovieItem type="genre">
								{item.genres.map((genre, index) => (
									<div key={index} className="inline pr-1 ">
										{genre}
									</div>
								))}
							</MovieItem>
							<MovieItem type="duration">{item.duration / 60} minutes</MovieItem>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export { Results };
