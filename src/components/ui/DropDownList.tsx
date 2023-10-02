import React from 'react';
import { DropDownListItem } from './DropDownListItem';

type DropDownListProps = {
	items: string[],
	isVisible?: boolean,
	onClick?: (index: number) => void,
	onHover?: (index: number) => void,
	selectedIndex: number
};

function DropDownList({ items, isVisible = true, onClick, onHover, selectedIndex }: DropDownListProps) {
	if (!isVisible)
		return <></>;

	const handleOnClick = (e: React.MouseEvent, index: number) => {
		e.stopPropagation();
		onClick && onClick(index);
	};

	const handleOnHover = (index: number) => {
		onHover && onHover(index);
	}

	return (
		<ul tabIndex={0}
			className="absolute w-full bg-white shadow-md shadow-gray-600 text-lg rounded-xl self-start 
     z-[100] min-h-[10px] p-1"
		>

			{items.map((item, index) => (
				<DropDownListItem
					key={index}
					index={index}
					onClick={handleOnClick}
					onHover={handleOnHover}
					selected={selectedIndex === index}
					title={item}
				/>
			))}
		</ul>
	);
}

export { DropDownList, DropDownListItem };