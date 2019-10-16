import React, { Component } from "react";
import Movie from "./Movie";
import Search from "./Search";

export class TopRated extends Component {
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
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
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
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this
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

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="TopRated">
        <Search />
        <button onClick={this.goBack}>GO BACK</button>
        <div className="MovieList Movie-container">
          {this.state.movies ? (
            this.state.movies.map(m => <Movie movie={m} />)
          ) : (
            <p class="loading">Loading movies...</p>
          )}

          <button onClick={this.loadMore}>Load More Movies</button>
        </div>
      </div>
    );
  }
}

export default TopRated;
