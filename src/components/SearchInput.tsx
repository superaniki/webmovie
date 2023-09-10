import React, { useEffect, useState } from 'react';
import { Axios } from 'axios';
import { Dropdown, DropdownItem } from './Dropdown';

type SearchInputProps = {
	enterCallback: (value: string) => void;
};

function SearchInput({ enterCallback }: SearchInputProps) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [suggestions, setSuggestions] = useState<[] | string[]>([]);

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedValue = event.target.value;
		setSearchQuery(updatedValue);

		/*if (updatedValue !== '') setSuggestions([updatedValue]);
		else setSuggestions([]);
    */

		//if (callback != undefined) callback(updatedValue);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			enterCallback(searchQuery);
		}
	};

	return (
		<div className="relative">
			<label
				className="relative top-3 mr-10 inline-block font-extrabold text-transparent mb-[20px] text-5xl 
        bg-clip-text bg-gradient-to-r from-purple-400 to-slate-300"
			>
				Search Movie
			</label>
			<div className="inline-block relative">
				<input
					onKeyDown={handleKeyDown}
					value={searchQuery}
					onChange={onInputChange}
					className="border-4 rounded-xl p-3 outline-none focus:border-blue-300 focus:border-4"
				/>
				{suggestions.length > 0 && (
					<Dropdown>
						<DropdownItem title={suggestions[0]} />
					</Dropdown>
				)}
			</div>
		</div>
	);
}

export { SearchInput };
