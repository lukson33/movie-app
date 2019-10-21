import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import MovieApp from "./components/MovieApp";
import Movies from "./components/Movies";
import MovieList from "./components/MovieList";
import FullCast from "./components/FullCast";
import TopRated from "./components/TopRated";
import "./App.css";
import Upcoming from "./components/Upcoming";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MovieApp} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:name" component={MovieList} />
          <Route exact path="/movies/:name/:id" component={MovieDetails} />
          <Route
            exact
            path="/movies/:name/:id/full-cast"
            component={FullCast}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
