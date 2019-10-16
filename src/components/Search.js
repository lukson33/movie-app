import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import axios from "axios";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      movieInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log(this.state.movieInput);
      console.log(this.props.history);
      try {
        const response = await axios.get(url);
        this.setState({ pages: 2 });
        const newMovies = response.data.results;
        this.setState(prevState => ({
          movies: [...prevState.movies, newMovies]
        }));
      } catch (err) {
        console.log(err);
      }
    }
    console.log(this.state.movies);
  }
  render() {
    return (
      <div>
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
            <button onClick={this.handleSubmit} type="submit">
              Search movies
            </button>
          </Link>
        </form>
        {this.state.isShown && <p>Please enter a movie</p>}

        <MovieList
          movieName={this.props.location.state.name}
          movies={this.state.movies}
        />
      </div>
    );
  }
}

export default Search;
