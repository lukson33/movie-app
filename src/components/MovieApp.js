import React, { Component } from "react";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";
import { Link } from "react-router-dom";
import axios from "axios";
import "../MovieApp.css";
import { throwStatement } from "@babel/types";

export class MovieApp extends Component {
  constructor(props) {
    super(props);

    this.state = { movieInput: "", movies: [], pages: 1, isShown: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  async handleMore(e) {
    if (this.state.movieInput === "") {
      e.preventDefault();
    } else {
      e.preventDefault();
      const value = this.state.movieInput;
      const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=${
        this.state.pages
      }&include_adult=false`;
      try {
        const response = await axios.get(url);
        console.log(response);
        if (this.state.pages === response.data.total_pages + 1) {
          console.log("No more results to be shown");
        } else {
          const newMovies = response.data.results;
          this.setState(prevState => ({
            movies: [...prevState.movies, newMovies],
            pages: this.state.pages + 1
          }));
          console.log(newMovies);
        }
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
          <button type="submit">Submit</button>
          <button onClick={this.handleMore}>Load More</button>
        </form>
        {this.state.isShown && <p>Please enter a movie</p>}
        <div className="Movie-container">
          {this.state.movies.map(arr =>
            arr.map(m => (
              <Link to={`/movies/${m.title}/${m.id}`}>
                <Movie movie={m} key={m.id} />
              </Link>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default MovieApp;
