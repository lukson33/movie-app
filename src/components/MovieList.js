import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../MovieList.css";
import Movie from "./Movie";
import MovieDetails from "./MovieDetails";

export class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      newMovies: [],
      pageNum: 1
    };

    this.loadMore = this.loadMore.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  async componentDidMount() {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.props.movieName}&page=1&include_adult=false`
    );
    const movies = await res.json();
    const newMovies = movies.results;
    this.setState({ movies: newMovies });
    console.log(this.state.movies);
  }

  async loadMore() {
    this.setState(prevState => ({
      pageNum: prevState.pageNum + 1
    }));
    console.log(this.state.pageNum);
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.props.movieName
      }&page=${this.state.pageNum + 1}&include_adult=false`
    );
    const movies = await res.json();
    const newMovies = movies.results;
    console.log(newMovies);
    this.setState({ newMovies: [...newMovies] });
    this.setState(prevState => ({
      movies: [...prevState.movies, ...newMovies]
    }));
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.props.movieName);
    return (
      <div>
        <button onClick={this.goBack}>GO BACK</button>
        <div className="MovieList Movie-container">
          {this.state.movies ? (
            this.state.movies.map(m => <Movie movie={m} />)
          ) : (
            <p class="loading">Loading movies...</p>
          )}
        </div>
        <button onClick={this.loadMore}>LOAD MORE</button>
      </div>
    );
  }
}

export default MovieList;
