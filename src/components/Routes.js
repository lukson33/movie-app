import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import MovieApp from "./MovieApp";
import Movies from "./Movies";

export class Routes extends Component {
  render() {
    // const getMovie = props => {
    //   let name = props.match.params.name;
    //   let currMovie = this.props.movies.find(
    //     movie => movie.name.toLowerCase() === name
    //   );
    //   return <MovieDetails {...props} movie={currMovie} />;
    // };
    return (
      <div>
        <Switch>
          <Route exact path="/" component={MovieApp} />
          <Route exact path="/movies" component={Movies} />
          {/* <Route exact path="/movies/:name" component={getMovie} /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
