import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

import { Link } from "react-router-dom";

import axios from "axios";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://groverohit-movie-api.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/Movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/", "_self");
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    if (!movie) return null;

    return (
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Card.Text>Director: {movie.Director.Name}</Card.Text>
          </Link>
          <Link to={`/`}>
            <Button variant="primary">Back</Button>
          </Link>
          <Button variant="link" onClick={() => this.addFavorite(movie)}>
            Add Favorite
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  //   onBackClick: PropTypes.func.isRequired,
};
