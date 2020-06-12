import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
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

  render() {
    const { movies, selectedMovie } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <div>
            <MovieView movie={selectedMovie} />
            <button className="back-button" onClick={() => this.onBackClick()}>
              Back
            </button>
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
