import React from "react";
import "../Actor.css";

export default function Actor(props) {
  const { character, name, profile_path } = props.actor;
  return (
    <div className="Actor">
      <p>
        {name} as {character}
      </p>
      {profile_path ? (
        <img
          className="actor-img"
          src={`http://image.tmdb.org/t/p/w185//${profile_path}`}
          alt=""
        />
      ) : (
        <p>Image not found</p>
      )}
    </div>
  );
}
