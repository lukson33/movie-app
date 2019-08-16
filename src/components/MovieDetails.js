import React, { Component, useState, useEffect } from "react";
import Actor from "./Actor";
import "../Actor.css";

export default class MovieDetails extends Component {
  //Fix scroll error
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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

    const actors = this.props.location.state.actors[0].cast;
    const newActors = actors.slice(0, 9);
    return (
      <div className="Movie-details">
        <h3>{original_title}</h3>
        <p>{overview}</p>
        <p>{release_date}</p>
        <img src={`http://image.tmdb.org/t/p/w185//${poster_path}`} alt="" />
        <p>{vote_average}</p>

        <div className="actors-container">
          {newActors
            .filter(actor => actor.profile_path)
            .map(actor => (
              <Actor actor={actor} id={actor.cast_id} />
            ))}
        </div>
      </div>
    );
  }
}
