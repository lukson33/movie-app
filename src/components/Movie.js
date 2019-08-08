import React, { Component } from "react";
import "../Movie.css";

export class Movie extends Component {
  render() {
    return (
      <div className="Movie">
        <h2>{this.props.movie.title}</h2>

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

export default Movie;
