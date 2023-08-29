import { useEffect, useRef, useState } from "react";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovies } from "./WatchedMovies";
import { MoviesList } from "./MoviesList";
import { MovieDetails } from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const { movies, isLoading, error } = useMovies(query, handleClose);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const inputEl = useRef(null);

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

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery('');
  })

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
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


