import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Search.css";
import axios from "axios";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieInput: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
      <div className="Search">
        <div className="Search-container">
          <form onSubmit={this.handleSubmit}>
            <input
              name="movieInput"
              type="text"
              placeholder="Search for a movie"
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
        </div>
      </div>
    );
  }
}

export default Search;
