import React, { Component } from "react";
import Cast from "./Cast";

export class FullCast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actors: [],
      crew: []
    };
  }

  componentWillMount() {
    this.setState({
      actors: [...this.props.location.state.actors.cast],
      crew: [...this.props.location.state.actors.crew]
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
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
    );
  }
}

export default FullCast;
