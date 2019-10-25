import React, { Component } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import Header from "./Header";
import Search from "./Search";
import "../MovieApp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { throwStatement } from "@babel/types";

export class MovieApp extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [], pageNum: 1, isShown: true, render: false };

    this.loadMore = this.loadMore.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const movies = await res.json();
    const newMovies = movies.results;
    console.log(newMovies);
    this.setState({ movies: newMovies });

    setTimeout(
      function() {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      500
    );
  }

  async loadMore() {
    this.setState(prevState => ({
      pageNum: prevState.pageNum + 1
    }));
    console.log(this.state.pageNum);
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.pageNum + 1}`
    );
    const movies = await res.json();
    const newMovies = movies.results;
    console.log(newMovies);
    this.setState({ newMovies: [...newMovies] });
    this.setState(prevState => ({
      movies: [...prevState.movies, ...newMovies]
    }));
  }

  handleDelete = e => {
    this.setState({ movieInput: "" });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Header />
        <Search />
        <div className="MovieApp">
          <div className="Movie-container">
            {this.state.movies.map(movie => (
              <Movie movie={movie} key={movie.id} />
            ))}
            {this.state.render ? (
              <button className="load-btn" onClick={this.loadMore}>
                Load More Movies
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieApp;
