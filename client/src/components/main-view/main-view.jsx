import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://groverohit-movie-api.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }

  onBackClick() {
    this.setState({ selectedMovie: null });
  }

  onLoggedIn(user) {
    this.setState({ user });
  }

  onRegistration() {
    this.setState({ register: true });
  }

  onRegistrationCancel() {
    this.setState({ register: false });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (register)
      return (
        <RegistrationView
          onRegistrationCancel={() => this.onRegistrationCancel()}
        />
      );

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegistrationClick={() => this.onRegistration()}
        />
      );

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <div>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => this.onBackClick()}
            />
          </div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
