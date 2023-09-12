import React, { useState, useRef } from 'react';
import { DropDown, DropDownItem } from './DropDown';
import { INPUT_PLACEHOLDER_TEXT, SEARCH_DELAY } from './../../constants';

type SearchInputProps = {
	querySuggestionsCallback: (value: string) => void;
	querySearchCallback: (value: string) => void;
	suggestions?: string[];
};

function SearchInput({ querySuggestionsCallback, querySearchCallback, suggestions = [] }: SearchInputProps) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
	const [displaySuggestions, setDisplaySuggestions] = useState(false);

	const trimmedSuggestions = suggestions.filter((item, index) => index < 5);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const debounce = (fn: Function, ms = 100) => {
		let timeoutId: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: any[]) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.apply(this, args), ms);
		};
	};

	const delayedSearch = debounce((value: string) => {
		querySuggestionsCallback(value);
	}, SEARCH_DELAY); // Adjust the delay as needed

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedValue = event.target.value;
		setSearchQuery(updatedValue);
		if (updatedValue === '') hideSuggestions();
		delayedSearch(updatedValue); // Debounced function call
	};

	function selectSuggestion(index: number) {
		const selectedSuggestion = trimmedSuggestions[index];
		setSearchQuery(selectedSuggestion);
		querySearchCallback(selectedSuggestion);
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (trimmedSuggestions.length > 0 && selectedSuggestionIndex > -1) {
				selectSuggestion(selectedSuggestionIndex);
			} else {
				querySearchCallback(searchQuery);
			}
			if (inputRef.current) {
				inputRef.current.blur(); // Blur the input element
				hideSuggestions();
			}
			return;
		}
		setDisplaySuggestions(true);
		if (event.key === 'ArrowDown') {
			if (selectedSuggestionIndex < trimmedSuggestions.length - 1)
				setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
			if (selectedSuggestionIndex === trimmedSuggestions.length - 1) setSelectedSuggestionIndex(0);
			return;
		}
		if (event.key === 'ArrowUp') {
			if (selectedSuggestionIndex > 0) setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
			if (selectedSuggestionIndex < 1) setSelectedSuggestionIndex(trimmedSuggestions.length - 1);
			return;
		}
		if (event.key === 'Escape') {
			if (inputRef.current) {
				inputRef.current.blur(); // Blur the input element
				hideSuggestions();
			}
			return;
		}
	};

	const hideSuggestions = () => {
		setDisplaySuggestions(false);
		setSelectedSuggestionIndex(-1);
	};

	const handleDropDownClickCallback = (e: React.MouseEvent, index: number) => {
		e.stopPropagation();
		selectSuggestion(index);
		if (inputRef.current) {
			inputRef.current.blur(); // Blur the input element
			hideSuggestions();
		}
	};
	const handleDropDownMouseEnterCallback = (index: number) => setSelectedSuggestionIndex(index);

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
					placeholder={INPUT_PLACEHOLDER_TEXT}
					ref={inputRef}
					onKeyDown={handleKeyDown}
					value={searchQuery || ''}
					onChange={onInputChange}
					className="border-4 rounded-xl p-3 outline-none focus:border-blue-300 focus:border-4"
				/>
				{suggestions.length > 0 && displaySuggestions && (
					<DropDown>
						{trimmedSuggestions.map((item, index) => (
							<DropDownItem
								key={index}
								index={index}
								clickCallback={handleDropDownClickCallback}
								mouseEnterCallback={handleDropDownMouseEnterCallback}
								selected={index === selectedSuggestionIndex}
								title={item}
							/>
						))}
					</DropDown>
				)}
			</div>
		</div>
	);
}

export { SearchInput };
