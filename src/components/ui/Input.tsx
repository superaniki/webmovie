import { FocusEvent, useState, useRef } from 'react';
import { INPUT_PLACEHOLDER_TEXT } from '../../constants';

type InputProps = {
  onSubmit?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  managed?: boolean
  managedValue?: string;
};

export function Input({ onSubmit, onValueChange, onFocus, onBlur, onKeyDown, managed = false, managedValue }: InputProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value;
    setValue(updatedValue);
    onValueChange && value !== updatedValue && onValueChange(updatedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit && onSubmit(value);
      blur();
    }
    else if (event.key === 'Escape') {
      blur();
    }
    onKeyDown && onKeyDown(event);
  };

  function blur() {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  return <input
    placeholder={INPUT_PLACEHOLDER_TEXT}
    ref={inputRef}
    value={managed ? managedValue : value}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    className="border-4 rounded-xl p-3 outline-none focus:border-blue-300 focus:border-4"
    onFocus={onFocus}
    onBlur={onBlur}
  />
}