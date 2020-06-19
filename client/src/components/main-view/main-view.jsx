import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem("user") });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }

  onBackClick() {
    this.setState({ selectedMovie: null });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ user: authData.user.Username });

    localStorage.setItem("token", authData.Token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.Token);
  }

  getMovies(token) {
    axios
      .get("https://groverohit-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegistration() {
    this.setState({ register: true });
  }

  onRegistrationCancel() {
    this.setState({ register: false });
  }

  render() {
    const { movies, user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return (
                <div className="moviesList">
                  <Button
                    variant="link"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.open("/", "_self");
                    }}
                  >
                    Logout
                  </Button>
                  <Link to={`/users/${user}`}>
                    <Button variant="link">Edit Profile</Button>
                  </Link>
                  {movies.map((m) => (
                    <MovieCard key={m._id} movie={m} />
                  ))}
                </div>
              );
            }}
          />
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route
            exact
            path="/users/:userId"
            render={({ match }) => (
              <ProfileView
                selectedUser={match.params.userId}
                movies={this.state.movies}
              />
            )}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }

  //   const { movies, selectedMovie, user, register } = this.state;

  //   if (register)
  //     return (
  //       <RegistrationView
  //         onRegistrationCancel={() => this.onRegistrationCancel()}
  //       />
  //     );

  //   if (!user)
  //     return (
  //       <LoginView
  //         onLoggedIn={(user) => this.onLoggedIn(user)}
  //         onRegistrationClick={() => this.onRegistration()}
  //       />
  //     );

  //   if (!movies) return <div className="main-view" />;

  //   return (
  //     <div className="main-view">
  //       {selectedMovie ? (
  //         <div>
  //           <MovieView
  //             movie={selectedMovie}
  //             onBackClick={() => this.onBackClick()}
  //           />
  //         </div>
  //       ) : (
  //         movies.map((movie) => (
  //           <MovieCard
  //             key={movie._id}
  //             movie={movie}
  //             onClick={(movie) => this.onMovieClick(movie)}
  //           />
  //         ))
  //       )}
  //     </div>
  //   );
  // }
}
