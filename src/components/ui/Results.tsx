import React from 'react';

type ResultsItem = {
	id: string, data: {
		[key: string]: string | string[] | number
	}
}

type ResultsProps = {
	items: ResultsItem[];
};

function ResultListItem({ item }: { item: ResultsItem }) {
	return <li className="block mb-8 p-5 bg-white border-slate-300 border-[1px]" key={item.id} >
		{Object.keys(item.data).map(type => {

			let data: string | React.ReactNode = item.data[type];

			if (Array.isArray(data)) {
				data = data.map((arrayData, index) => <div key={index} className="inline pr-1 ">
					{arrayData}
				</div>)
			}

			return <div className="leading-tight pb-1">
				<div className="float-left text-right w-[100px] pr-5 italic text-gray-500">{type}</div>
				<div className="block text-left opacity-80 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[500px]">
					{data}
				</div>
			</div>
		}
		)}
	</li >
}

function Results({ items }: ResultsProps) {
	return <ul className="mt-10">
		{items.map((item) =>
			<ResultListItem item={item} />
		)}
	</ul>
}

export { Results };