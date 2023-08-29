import { useEffect } from "react";

const KEY = "e5857ef8";

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(function () {
        const controller = new AbortController();
        setIsLoading(true);
        async function fetchMovies() {
            try {
                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal });

                if (!response.ok)
                    setError('Something went wrong with fetching movies');

                const data = await response.json();

                if (data.Response === "False")
                    setError('Movie not found');

                setMovies(data.Search);
                setError('');
            }
            catch (err) {
            }
            finally {
                setIsLoading(false);
            }

        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        callback();
        fetchMovies();
        return () => controller.abort();
    }, [query]);

    return { movies, isLoading, error }
}