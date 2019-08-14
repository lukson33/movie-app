import React, { useState, useEffect } from "react";

export default function MovieDetails({ match }) {
  useEffect(() => {
    fetchMovie();
  }, []);

  const [movie, setMovie] = useState("");

  const fetchMovie = async () => {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const fetchMovie = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${
        match.params.name
      }&page=1&include_adult=false`
    );
    const movie = await fetchMovie.json();
    const newMovie = movie.results.find(m => m.id === Number(match.params.id));
    setMovie(newMovie);
  };

  console.log(movie);

  return (
    <div>
      <h3>{movie.original_title}</h3>
      <p>{movie.overview}</p>
      <img
        src={`http://image.tmdb.org/t/p/w185//${movie.poster_path}`}
        alt=""
      />
      <p>{movie.vote_average}</p>
    </div>
  );
}
