import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import MovieApp from "./components/MovieApp";
import Movies from "./components/Movies";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MovieApp} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movies/:name/:id" component={MovieDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
