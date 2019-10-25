import React from "react";
import "../Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-container">
        <Link
          to={{
            pathname: `/`
          }}
        >
          <h1>React Movie App</h1>
        </Link>

        <ul>
          <Link
            to={{
              pathname: `/popular`
            }}
          >
            <a href="">
              <li>Popular Movies</li>
            </a>
          </Link>
          <Link
            to={{
              pathname: `/upcoming`
            }}
          >
            <a href="">
              <li>Upcoming Movies</li>
            </a>
          </Link>
          <Link
            to={{
              pathname: `/top-rated`
            }}
          >
            <a href="">
              <li>Top Rated Movies</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
