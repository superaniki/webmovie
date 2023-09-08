import React from 'react';

type ResultsProps = {
	items: Movie[];
	max?: number;
};

type Movie = {
	id: string;
	name: string;
	description: string;
	genres: string[];
	duration: number;
};

function Results({ items, max = -1 }: ResultsProps) {
	const slicedItems = items.slice(0, max);

	function MovieItem({ type, children }: { type: string; children: React.ReactNode }) {
		return (
			<div className="leading-tight">
				<div className="float-left text-right w-[100px] pr-5 italic text-gray-500">{type}</div>
				<div className="inline-block opacity-80 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[500px]">
					{children}
				</div>
			</div>
		);
	}

	return (
		<div className="p-10">
			<div className="py-10 text-gray-400 italic text-5xl"> Search Results </div>
			<ul>
				{slicedItems.map((item) => {
					return (
						<li className="block pb-5" id={item.id}>
							<MovieItem type="name">{item.name}</MovieItem>
							<MovieItem type="description">{item.description}</MovieItem>
							<MovieItem type="genre">
								{item.genres.map((genre) => (
									<div className="inline pr-1 ">{genre}</div>
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
