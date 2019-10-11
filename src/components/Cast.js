import React, { Component } from "react";
import "../Cast.css";
import img from "../no_image.jpg";

export default class Cast extends Component {
  constructor(props) {
    super(props);
  }

  //Fix scroll error
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { character, name, profile_path } = this.props.actor;

    return (
      <div className="Cast">
        <div className="Cast-img">
          {profile_path ? (
            <img
              src={`http://image.tmdb.org/t/p/w185//${profile_path}`}
              alt=""
            />
          ) : (
            <img src={img} alt="" />
          )}
        </div>
        <div className="Cast-text">
          <p className="Cast-name">{name}</p>
          <p className="Char-name">{character}</p>
        </div>
      </div>
    );
  }
}
