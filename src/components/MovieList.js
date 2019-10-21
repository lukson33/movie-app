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
  const [moreMov, setMore] = useState("");
  let [pageNum, setNum] = useState(2);

  const fetchMovies = async () => {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const fetchMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.location.state.name}&page=1&include_adult=false`
    );
    const movies = await fetchMovies.json();
    setMovies(movies.results);
  };

  const loadMore = async () => {
    setNum(pageNum + 1);
    console.log(pageNum);
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.location.state.name}&page=${pageNum}&include_adult=false`
    );
    const moviesArr = await res.json();
    const newMovies = moviesArr.results;
    setMovies([...movies, ...newMovies]);
  };

  return (
    <div>
      <div className="MovieList Movie-container">
        {movies ? (
          movies.map(m => <Movie movie={m} />)
        ) : (
          <p class="loading">Loading movies...</p>
        )}
      </div>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}
