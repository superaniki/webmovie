
import { useState } from "react";

function useIndexNavigation(startIndex: number, length: number)
  : [number, React.Dispatch<React.SetStateAction<number>>, (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) => void] {

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLUListElement>) => {

    if (event.key === 'ArrowUp') {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + length) % length);

    }
    if (event.key === 'ArrowDown') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    }
  };

  return [currentIndex, setCurrentIndex, keyDownHandler]
}

export { useIndexNavigation };