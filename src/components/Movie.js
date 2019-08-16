import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Movie.css";

export default class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actors: []
    };
  }

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

  // const fetchActors = async () => {
  //   const API_KEY = "aa7add1a816db1a576175e4abfc544cf";

  //   const fetchActors = await fetch(
  //     ``
  //   );
  //   const newActors = await fetchActors.json();
  //   setActors([...actors, actors]);
  // };

  // console.log(this.props);
  render() {
    return (
      <div className="Movie">
        <h2>{this.props.movie.title}</h2>
        <Link
          onUpdate={() => window.scrollTo(0, 0)}
          to={{
            pathname: `/movies/${this.props.movie.title}/${
              this.props.movie.id
            }`,
            state: { movieInfo: this.props, actors: this.state.actors }
          }}
        >
          <button>More details</button>
        </Link>

        {this.props.movie.poster_path ? (
          <img
            src={`http://image.tmdb.org/t/p/w185//${
              this.props.movie.poster_path
            }`}
            alt=""
          />
        ) : (
          <p>Image not found</p>
        )}
      </div>
    );
  }
}
