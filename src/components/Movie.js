import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Movie.css";

export default class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actors: []
    };

    this.truncate = this.truncate.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  truncate = (str, no_words) => {
    return str
      .split(" ")
      .splice(0, no_words)
      .join(" ");
  };

  getColor = () => {
    if (this.props.movie.vote_average >= 7.5) {
      return "rgb(57, 235, 57)";
    } else if (
      this.props.movie.vote_average >= 4 &&
      this.props.movie.vote_average <= 7.5
    ) {
      return "rgb(229, 255, 82)";
    } else if (
      this.props.movie.vote_average < 4 &&
      this.props.movie.vote_average > 0.1
    ) {
      return "rgb(255, 68, 68)";
    } else if (this.props.movie.vote_average === 0) {
      return "rgb(255, 255, 255)";
    }
  };

  async componentDidMount() {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const MOVIE_ID = this.props.movie.id;
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}`
    );
    const actors = await res.json();
    this.setState(prevState => ({
      actors: [...prevState.actors, actors]
    }));
  }

  render() {
    return (
      <div className="Movie">
        <div className="Movie-content">
          <div>
            <div className="vote-flex">
              <div className="vote-flex-num">
                <p style={{ color: this.getColor() }} className="vote-p">
                  {this.props.movie.vote_average === 0
                    ? "NR"
                    : this.props.movie.vote_average}
                </p>
              </div>
              <div className="vote-flex-text">
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.release_date}</p>
              </div>
            </div>

            <p className="movie-desc">
              {this.truncate(this.props.movie.overview, 20)}...
            </p>
          </div>
          <div>
            <Link
              // onUpdate={() => window.scrollTo(0, 0)}
              to={{
                pathname: `/movies/${this.props.movie.title}/${this.props.movie.id}`,
                state: { movieInfo: this.props, actors: this.state.actors }
              }}
            >
              <a href="">More info</a>
            </Link>
          </div>
        </div>

        {this.props.movie.poster_path ? (
          <img
            src={`http://image.tmdb.org/t/p/w185//${this.props.movie.poster_path}`}
            alt=""
          />
        ) : (
          <p>Image not found</p>
        )}
      </div>
    );
  }
}
