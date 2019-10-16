import React, { Component } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import "../MovieApp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { throwStatement } from "@babel/types";

export class MovieApp extends Component {
  constructor(props) {
    super(props);

    this.state = { movieInput: "", movies: [], pageNum: 1, isShown: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleSubmit(e) {
    if (this.state.movieInput === "") {
      e.preventDefault();
      this.setState({ isShown: true });
    } else {
      this.setState({ isShown: false });
      e.preventDefault();
      const value = this.state.movieInput;
      const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;
      this.setState({
        movies: []
      });
      console.log(this.state.movies);
      try {
        const response = await axios.get(url);
        this.setState({ pages: 2 });
        console.log(response.data.results);
        const newMovies = response.data.results;
        this.setState(prevState => ({
          movies: [...prevState.movies, newMovies]
        }));
        console.log(this.state.movies);
      } catch (err) {
        console.log(err);
      }
    }
  }

  handleDelete = e => {
    this.setState({ movieInput: "" });
  };

  render() {
    console.log(this.props);
    return (
      <div className="MovieApp">
        <h1>Movie App!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="movieInput"
            type="text"
            value={this.state.movieInput}
            onChange={this.handleChange}
            onClick={this.handleDelete}
          />
          <Link
            to={{
              pathname: `/movie/${this.state.movieInput}`,
              state: { name: this.state.movieInput }
            }}
          >
            <button type="submit">Search movies</button>
          </Link>
          {/* <button onClick={this.handleMore}>Load More</button> */}
        </form>
        {this.state.isShown && <p>Please enter a movie</p>}
        {/* Display popular movies */}
        <h2 className="h2-popular">Popular movies</h2>

        <button>Popular Movies</button>
        <Link
          to={{
            pathname: `/upcoming`,
            state: { name: this.state.movieInput }
          }}
        >
          <button>Upcoming Movies</button>
        </Link>
        <Link
          to={{
            pathname: `/top-rated`,
            state: { name: this.state.movieInput }
          }}
        >
          <button>Top Rated Movies</button>
        </Link>

        <div className="Movie-container">
          {this.state.movies.map(movie => (
            <Movie movie={movie} key={movie.id} />
          ))}
          <button onClick={this.loadMore}>Load More Movies</button>
        </div>
      </div>
    );
  }
}

export default MovieApp;
