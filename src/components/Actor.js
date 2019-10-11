import React from "react";
import "../Actor.css";

export default function Actor(props) {
  const { character, name, profile_path } = props.actor;
  return (
    <div className="Actor">
      <div className="Actor-img">
        {profile_path ? (
          <img src={`http://image.tmdb.org/t/p/w185//${profile_path}`} alt="" />
        ) : (
          <p>Image not found</p>
        )}
      </div>
      <div className="Actor-text">
        <p className="Actor-name">{name}</p>
        <p className="Char-name">{character}</p>
      </div>
    </div>
  );
}
