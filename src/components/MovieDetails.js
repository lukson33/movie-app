import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Actor from "./Actor";
import "../Actor.css";
import "../MovieDetails.css";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTrue: false
    };

    this.toggle = this.toggle.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getNumber = this.getNumber.bind(this);
    this.getGradient = this.getGradient.bind(this);
  }
  //Fix scroll error
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggle = () => {
    this.setState({ isTrue: !this.state.isTrue });
    console.log(this.state.isTrue);
  };

  getGradient = () => {
    const gradients = [
      "linear-gradient(to right, #2C5364, #203A43, #0F2027)",
      "linear-gradient(to right, #141e30, #243b55)",
      "linear-gradient(to right, #0f0c29, #302b63, #24243e)"
    ];
    const rnd = Math.floor(Math.random() * 3);
    return gradients[rnd];
  };

  getColor = () => {
    if (this.props.location.state.movieInfo.movie.vote_average >= 7.5) {
      return "rgb(1, 197, 1)";
    } else if (
      this.props.location.state.movieInfo.movie.vote_average >= 4 &&
      this.props.location.state.movieInfo.movie.vote_average <= 7.5
    ) {
      return "rgb(207, 233, 64)";
    } else if (
      this.props.location.state.movieInfo.movie.vote_average < 4 &&
      this.props.location.state.movieInfo.movie.vote_average > 0.1
    ) {
      return "rgb(255, 68, 68)";
    } else if (this.props.location.state.movieInfo.movie.vote_average === 0) {
      return "rgb(255, 255, 255)";
    }
  };

  getNumber = () => {
    if (this.props.location.state.movieInfo.movie.vote_average === 0) {
      return "NR";
    } else if (
      this.props.location.state.movieInfo.movie.vote_average % 1 ===
      0
    ) {
      return `${this.props.location.state.movieInfo.movie.vote_average}.0`;
    } else {
      return this.props.location.state.movieInfo.movie.vote_average;
    }
  };

  render() {
    const {
      id,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      vote_count,
      vote_average
    } = this.props.location.state.movieInfo.movie;

    let actors = this.props.location.state.actors[0].cast;
    let half = Math.floor(actors.length / 2);

    let actorsFirst = actors.slice(0, 5);
    let actorsSecond = actors.slice(5, actors.length);

    console.log(this.props);

    const release_year = release_date.split("-")[0];
    const releaseDate = release_year;

    return (
      <div className="Movie-details">
        <div
          className="Movie-background"
          style={{ background: this.getGradient() }}
        >
          <div className="Movie-wrapper">
            <div className="Movie-text">
              <h3>
                {original_title} ({releaseDate})
              </h3>
              <p
                style={{
                  color: this.getColor(),
                  border: `4px solid ${this.getColor()}`
                }}
                className="vote-p"
              >
                {this.getNumber()}
              </p>
              <p className="overview">Overview</p>
              <p>{overview}</p>
            </div>
            <img
              src={`http://image.tmdb.org/t/p/w185//${poster_path}`}
              alt=""
            />
          </div>
        </div>

        <div className="Actors">
          <h2>Top Billed Cast</h2>

          <div className="actors-container">
            {actorsFirst
              .filter(actor => actor.profile_path)
              .map(actor => (
                <Actor actor={actor} id={actor.cast_id} />
              ))}

            {this.state.isTrue
              ? actorsSecond
                  .filter(actor => actor.profile_path)
                  .map(actor => <Actor actor={actor} id={actor.cast_id} />)
              : null}
          </div>
          <Link
            // onUpdate={() => window.scrollTo(0, 0)}
            to={{
              pathname: `/movies/${original_title}/${id}/full-cast`,
              state: {
                actors: this.props.location.state.actors[0],
                title: original_title,
                year: releaseDate,
                image: poster_path
              }
            }}
          >
            <button>Full Cast &amp; Crew</button>
          </Link>
        </div>
      </div>
    );
  }
}
