import React, { useState } from 'react';
import { DropDownList } from './DropDownList';
import { SEARCH_DELAY } from '../../constants';
import { debounce } from '../../utils/debounce';
import { useIndexNavigation } from '../../hooks/useIndexNavigation';
import { FocusEvent } from 'react';
import { Input } from './Input';

type InputWithSuggestionsProps = {
	onSubmit?: (value: string) => void;
	onSuggestionSubmit?: (value: string) => void;
	suggestions?: string[];
};

function InputWithSuggestions({ onSubmit, onSuggestionSubmit, suggestions = [] }: InputWithSuggestionsProps) {
	const _suggestions = suggestions.filter((item, index) => index < 5);

	const [inputValue, setInputValue] = useState<string>("");
	const [displayDropDown, setDisplayDropDown] = useState(false);
	const [currentIndex, setCurrentIndex, keyDownHandler] = useIndexNavigation(-1, _suggestions.length);

	function selectSuggestion(index: number) {
		const selectedSuggestion = _suggestions[index];
		setInputValue(selectedSuggestion);
		onSubmit && onSubmit(selectedSuggestion);
	}

	const handleSubmit = () => {
		let submitValue = inputValue;
		if (currentIndex > 0)
			submitValue = _suggestions[currentIndex];
		setInputValue(submitValue);
		onSubmit && onSubmit(submitValue);
		console.log(submitValue);
	}

	const delayedSearch = debounce((value: string) => {
		onSuggestionSubmit && onSuggestionSubmit(value);
	}, SEARCH_DELAY);

	const handleOnValueChange = (value: string) => {
		setInputValue(value);
		if (onSuggestionSubmit !== undefined)
			delayedSearch(value);

		setDisplayDropDown(true);
		setCurrentIndex(-1);
	}

	const handleOnClickDropDown = (index: number) => {
		selectSuggestion(index);
		setDisplayDropDown(false);
		setCurrentIndex(-1);
	};

	const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
		let focusedTag = e.relatedTarget && e.relatedTarget.tagName.toLowerCase();
		if (focusedTag !== 'ul') {
			setDisplayDropDown(false);
		}
	}

	return (
		<div className="inline-block relative">
			<Input managed={true} managedValue={inputValue} onSubmit={handleSubmit}
				onValueChange={handleOnValueChange}
				onKeyDown={keyDownHandler}
				onBlur={handleOnBlur}
				onFocus={() => setDisplayDropDown(true)}
			/>

			<DropDownList items={_suggestions}
				isVisible={displayDropDown && _suggestions.length > 0}
				onHover={(index) => setCurrentIndex(index)}
				onClick={handleOnClickDropDown}
				selectedIndex={currentIndex}
			/>
		</div >
	)
}

export { InputWithSuggestions }
