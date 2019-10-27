import React, { Component } from "react";
import Cast from "./Cast";
import Header from "./Header";
import "../FullCast.css";

export class FullCast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actors: [],
      crew: []
    };

    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.setState({
      actors: [...this.props.location.state.actors.cast],
      crew: [...this.props.location.state.actors.crew]
    });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.props.location);
    return (
      <div className="FullCast">
        <Header />
        <div className="movie-banner">
          <div className="banner-container">
            <img
              src={`http://image.tmdb.org/t/p/w185//${this.props.location.state.image}`}
              alt=""
            />
            <h1>
              {this.props.location.state.title} (
              {this.props.location.state.year})
            </h1>
          </div>
        </div>
        <div className="FullCast-container">
          <div className="col">
            <h2>Cast ({this.state.actors.length})</h2>
            {this.state.actors.map(a => (
              <Cast actor={a} />
            ))}
          </div>

          <div className="col">
            <h2>Crew ({this.state.crew.length})</h2>
            {this.state.crew.map(a => (
              <Cast actor={a} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FullCast;
