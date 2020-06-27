import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

import { Link } from "react-router-dom";

import axios from "axios";

export class MovieCard extends React.Component {
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
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
          <Button variant="link" onClick={() => this.addFavorite(movie)}>
            Add Favorite
          </Button>
          <Card.Img variant="bottom" src={movie.ImagePath} />
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
