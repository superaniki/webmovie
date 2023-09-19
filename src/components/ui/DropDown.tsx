import React from 'react';

type DropDownItemProps = {
	index: number;
	title: string;
	clickCallback: (e: React.MouseEvent, index: number) => void;
	mouseEnterCallback: (index: number) => void;
	selected: boolean;
};

function DropDownItem({ index, title, clickCallback, mouseEnterCallback, selected }: DropDownItemProps) {
	const selectedStyle = selected && 'bg-slate-200';
	const handleMouseEnter = () => mouseEnterCallback(index);
	const handleOnClick = (e: React.MouseEvent) => clickCallback(e, index);

	return (
		<li role="suggestion"
			onClick={handleOnClick}
			onMouseEnter={handleMouseEnter}
			className={`inline-block rounded-md p-1 select-none float-left ${selectedStyle}
			 w-full text-left text-ellipsis whitespace-nowrap [content-visibility:auto]`}
		>
			{title}
		</li>
	);
}

function DropDown({ children }: { children?: React.ReactNode }) {
	return (
		<ul
			className="absolute w-full bg-white shadow-md shadow-gray-600 text-lg rounded-xl self-start 
     z-[100] min-h-[10px] p-1"
		>
			{children}
		</ul>
	);
}

export { DropDown, DropDownItem };
