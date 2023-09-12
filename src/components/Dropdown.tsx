import React from 'react';

type DropdownItemProps = {
	index: number;
	title: string;
	clickCallback: (e: React.MouseEvent, index: number) => void;
	mouseEnterCallback: (index: number) => void;
	selected: boolean;
};

function DropdownItem({ index, title, clickCallback, mouseEnterCallback, selected }: DropdownItemProps) {
	const selectedStyle = selected && 'bg-slate-200';
	const handleMouseEnter = () => mouseEnterCallback(index);
	const handleOnClick = (e: React.MouseEvent) => clickCallback(e, index);

	return (
		<li
			onClick={handleOnClick}
			onMouseEnter={handleMouseEnter}
			className={`inline-block rounded-md p-1 select-none float-left ${selectedStyle}
			 w-full text-left text-ellipsis whitespace-nowrap [content-visibility:auto]`}
		>
			{title}
		</li>
	);
}

function Dropdown({ children }: { children?: React.ReactNode }) {
	return (
		<ul
			className="absolute w-full bg-white shadow-md shadow-gray-600 text-lg rounded-xl self-start 
     z-[100] min-h-[10px] p-1"
		>
			{children}
		</ul>
	);
}

export { Dropdown, DropdownItem };
