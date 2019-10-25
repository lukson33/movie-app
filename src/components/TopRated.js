import React, { Component } from "react";
import Movie from "./Movie";
import Search from "./Search";
import Header from "./Header";

export class TopRated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      newMovies: [],
      pageNum: 1,
      render: false
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
        <Header />
        <Search />
        {/* <button onClick={this.goBack}>GO BACK</button> */}
        <div className="MovieList Movie-container">
          {this.state.movies ? (
            this.state.movies.map(m => <Movie movie={m} />)
          ) : (
            <p class="loading">Loading movies...</p>
          )}

          {this.state.render ? (
            <button className="load-btn" onClick={this.loadMore}>
              Load More Movies
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TopRated;
