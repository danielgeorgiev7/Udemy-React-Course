import { useEffect, useState } from "react";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovies } from "./WatchedMovies";
import { MoviesList } from "./MoviesList";
import { MovieDetails } from "./MovieDetails";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "e5857ef8";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  function handleSelect(id) {
    setSelectedId(() => selectedId === id ? '' : id);
  }

  function handleClose() {
    setSelectedId('');
  }

  function handleAddWatched(movie) {
    const inWatched = watched.filter((w) => w.imdbID === movie.imdbID);
    if (inWatched.length === 0) {
      setWatched((movies) => [...movies, movie]);
    }
    else {
      setWatched(() => watched.map(function (m) {
        m.userRating = (m.imdbID === movie.imdbID ? movie.userRating : m.userRating);
        return m;
      }));
    }
  }

  function handleDeleteWatched(id) {
    setWatched((movies) => movies.filter((m) => m.imdbID !== id));
  }

  useEffect(function () {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {signal: controller.signal});

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

    handleClose();
    fetchMovies();
    return () => controller.abort();
  }, [query])

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box style={{ overflow: "scroll" }}>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} onSelect={handleSelect} />}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ?
            <MovieDetails selectedId={selectedId} onClose={handleClose} onAddWatched={handleAddWatched} watched={watched} />
            :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovies watched={watched} onDelete={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">LOADING...</p>
}

function Error({ message }) {
  return <p className="error">
    <span>⛔</span>{message}
  </p>
}

function NavBar({ children }) {
  return <nav className="nav-bar">
    {children}
  </nav>
}

function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

function Search({ query, setQuery }) {
  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
}
function Main({ children }) {
  return <main className="main">
    {children}
  </main>
}

function NumResults({ movies }) {
  return <p className="num-results">
    Found <strong>{movies?.length}</strong> results
  </p>
}

function Box({ children, style }) {
  const [isOpen, setisOpen] = useState(true);
  return <div style={style} className="box">
    <button
      className="btn-toggle"
      onClick={() => setisOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && (children)}
  </div>
}


