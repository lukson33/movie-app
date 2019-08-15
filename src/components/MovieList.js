import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../MovieList.css";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";

export default function MovieList(props) {
  useEffect(() => {
    fetchMovies();
  }, []);

  const [movies, setMovies] = useState("");

  const fetchMovies = async () => {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const fetchMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${
        props.location.state.name
      }&page=1&include_adult=false`
    );
    const movies = await fetchMovies.json();
    setMovies(movies.results);
  };
  console.log(movies);
  return (
    <div className="MovieList Movie-container">
      {movies ? movies.map(m => <Movie movie={m} />) : <p>nothing there</p>}
    </div>
  );
}
