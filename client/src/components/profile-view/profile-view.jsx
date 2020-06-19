import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";

// import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://groverohit-movie-api.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({ favoriteMovies: response.data.FavoriteMovies });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let url =
      "https://groverohit-movie-api.herokuapp.com/users/" +
      localStorage.getItem("user");

    let user = {
      Username: this.state.username,
      Password: this.state.password,
      Email: this.state.email,
      Birthday: this.state.dob,
    };
    let token = localStorage.getItem("token");
    axios
      .put(url, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile Updated");
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://groverohit-movie-api.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/Movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
  }

  handleDelete() {
    if (!confirm("Are you sure?")) return;
    let token = localStorage.getItem("token");
    let url =
      "https://groverohit-movie-api.herokuapp.com/users/" + this.state.username;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response));

    localStorage.removeItem("token");
    // localStorage.removeItem("user");
    window.open("/", "_self");
  }

  render() {
    const { movies } = this.props;
    // console.log(movies);
    this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Form style={{ width: "32rem", float: "left" }}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={this.state.dob}
              placeholder="1986-12-31"
              onChange={(e) => this.setState({ dob: e.target.value })}
            />
          </Form.Group>

          {
            <Button
              variant="primary"
              type="submit"
              onClick={(event) => this.handleSubmit(event)}
            >
              Submit
            </Button>
          }

          <Button variant="link" onClick={() => this.handleDelete()}>
            Delete User
          </Button>
        </Form>

        <div style={{ float: "right", textAlign: "center", width: "48rem" }}>
          <h1>Favorite Movies</h1>
          {favoriteMovieList.map((movie) => {
            return (
              <div key={movie._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                  </Card.Body>
                </Card>
                <Button onClick={() => this.removeFavorite(movie)}>
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
