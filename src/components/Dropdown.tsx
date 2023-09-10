import React from 'react';

type DropdownItemProps = {
	title: string;
	callback?: () => void;
};

function DropdownItem({ title, callback }: DropdownItemProps) {
	return (
		<div onClick={callback} className="hover:bg-slate-200 rounded-md p-1 select-none float-left">
			{title}
		</div>
	);
}

function Dropdown({ children }: { children?: React.ReactNode }) {
	return (
		<div
			className="absolute w-full bg-white shadow-md shadow-gray-600 text-lg rounded-xl self-start 
     z-[100] min-h-[10px] p-1"
		>
			{children}
		</div>
	);
}

export { Dropdown, DropdownItem };
