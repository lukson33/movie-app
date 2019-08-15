import React, { useState, useEffect } from "react";

export default function MovieDetails(props) {
  // useEffect(() => {
  //   fetchMovie();
  // }, []);

  // const [movie, setMovie] = useState("");

  // const fetchMovie = async () => {
  //   const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
  //   const fetchMovie = await fetch(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${
  //       match.params.name
  //     }&page=1&include_adult=false`
  //   );
  //   const movie = await fetchMovie.json();
  //   const newMovie = movie.results.find(m => m.id === Number(match.params.id));
  //   setMovie(newMovie);
  // };

  // console.log(movie);
  console.log(props);
  const {
    id,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    vote_count,
    vote_average
  } = props.location.state.movieInfo.movie;
  return (
    <div>
      <h3>{original_title}</h3>
      <p>{overview}</p>
      <img src={`http://image.tmdb.org/t/p/w185//${poster_path}`} alt="" />
      <p>{vote_average}</p>
    </div>
  );
}
