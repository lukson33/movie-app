import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Movie.css";

export class Movie extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Movie">
        <h2>{this.props.movie.title}</h2>
        {/* to={{
              pathname: `/movie/${this.state.movieInput}`,
              state: { name: this.state.movieInput }
            }} */}
        {/* <Link to={`/movies/${this.props.movie.title}/${this.props.movie.id}`}> */}
        <Link
          to={{
            pathname: `/movies/${this.props.movie.title}/${
              this.props.movie.id
            }`,
            state: { movieInfo: this.props }
          }}
        >
          <button>More details</button>
        </Link>

        {/* </Link> */}

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
