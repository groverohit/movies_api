import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUsername } from "../../actions/actions";

import LoginView from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import ProfileView from "../profile-view/profile-view";
import MoviesList from "../movies-list/movies-list";
import UpdateView from "../update-view/update-view";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

import "./main-view.scss";
// import connect from "react-redux/lib/connect/connect";

export class MainView extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   movies: [],
    //   selectedMovie: null,
    //   user: null,
    //   register: null,
    // };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      // this.setState({ user: localStorage.getItem("user") });
      this.props.setUsername(localStorage.getItem("user"));
      this.getMovies(accessToken);
      // console.log("componentmount");
    }
  }

  // onMovieClick(movie) {
  //   this.setState({ selectedMovie: movie });
  // }

  // onBackClick() {
  //   this.setState({ selectedMovie: null });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    // console.log(safgshf);

    // this.setState({ user: authData.user.Username });
    // this.props.setUsername(authData.user.Username);

    localStorage.setItem("token", authData.Token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.Token);
    // console.log("getmovies");
  }

  getMovies(token) {
    axios
      .get("https://groverohit-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/client", "_self");
  }

  // onRegistration() {
  //   this.setState({ register: true });
  // }

  // onRegistrationCancel() {
  //   this.setState({ register: false });
  // }

  render() {
    let { movies, user } = this.props;

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">
            myFlix Movies
          </Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to={`/users/${user}`}>
            Profile
          </Nav.Link>

          <a
            className="nav-link"
            href="https://groverohit.github.io/portfolio-website/index.html"
          >
            About Developer
          </a>
          <Nav className="ml-auto">
            <Button variant="link" onClick={this.logout}>
              Logout
            </Button>
          </Nav>
        </Navbar>
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
                  {/* {movies.map((m) => (
                    <MovieCard key={m._id} movie={m} />
                  ))} */}
                  <MoviesList movies={movies} />;
                </div>
              );
            }}
          />
          <Route
            exact
            path="/users/"
            render={() => window.open("/client", "_self")}
          />
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route
            exact
            path="/users/:userId"
            render={() => <ProfileView movies={movies} />}
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
          <Route
            path="/update/:userId"
            render={() => {
              return <UpdateView />;
            }}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUsername })(MainView);

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
