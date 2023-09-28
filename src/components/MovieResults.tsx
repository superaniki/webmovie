import { Movie } from "../movie";
import Spinner from "./ui/Spinner";
import { Results } from "./ui/Results";

type MovieResultsProps = {
  items: [] | Movie[];
  max?: number;
  isLoading?: boolean;
  isError?: boolean;
};

function MovieResults({ items, max = 999, isLoading = false, isError = false }: MovieResultsProps) {
  const resultItems = items.map(item => {

    return {
      id: item.id, data: {
        name: item.name,
        description: item.description,
        genres: item.genres,
        duration: item.duration / 60 + " minutes"
      }
    }
  })

  const slicedItems = resultItems.slice(0, max);

  if (isError)
    return <div>Problem loading search results...</div>;

  if (isLoading)
    return <Spinner />

  return <Results items={slicedItems} />
}

export { MovieResults };