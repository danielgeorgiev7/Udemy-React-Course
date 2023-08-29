import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { KEY, Loader } from "./App";
import { useKey } from "./useKey";

export function MovieDetails({ selectedId, onClose, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  let isWatched = watched.map((w) => w.imdbID).includes(movie.imdbID);

  const { Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      title,
      poster,
      plot,
      released,
      actors,
      director,
      genre,
      runtime: runtime.split(' ').at(0),
      imdbRating: Number(imdbRating),
      imdbID: selectedId,
      userRating,
    }

    onAddWatched(newWatchedMovie);
    onClose();
  }

  useEffect(function () {
    async function detailsCall() {
      setIsLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
      setUserRating('');
    }
    detailsCall();
  }, [selectedId]);

  useKey("Escape", onClose);

  useEffect(function () {
    if (!title) return;
    document.title = 'Movie | ' + title;

    return () => document.title = 'usePopcorn'
  }, [title])

  return <div className="details">
    {isLoading ? <Loader /> :
      <>
        <header>
          <img src={poster} alt={`Poster of ${movie}`}></img>
          <button onClick={onClose} className="btn-back">↖</button>
          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p><span>⭐</span>{imdbRating} IMDb rating</p>
          </div>
        </header>

        <section>
          <div className="rating">
            {isWatched && !isClicked ?
              <p>You rated this movie with {watched.filter((m) => m.imdbID === movie.imdbID).map((m) => m.userRating)}⭐
                <span
                  onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                  onMouseLeave={(e) => e.target.style.textDecoration = ""}
                  onClick={() => setIsClicked(true)}
                  style={{ fontWeight: "lighter", cursor: "pointer" }}>Change rating</span>
              </p>
              : <>
                <StarRating maxRating={10} size={24} userRating={userRating} onSetRating={setUserRating} />
                {userRating && <button className="btn-add" onClick={handleAdd}>{isClicked === false ? "+ Add to list" : "Change rating"}</button>}
              </>}
          </div>
          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
      </>}
  </div>;
}
