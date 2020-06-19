import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./director-view.scss";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Title>Director: {director.Name}</Card.Title>
          <Card.Text>Description: {director.Bio}</Card.Text>
          <Card.Text>Birth: {director.Birth}</Card.Text>
          <Link to={`/`}>
            <Button variant="primary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
