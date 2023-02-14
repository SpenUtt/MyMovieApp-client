import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import './movie-card.scss'; 

//var PropTypes = require('prop-types'); to be deleted? 

export const MovieCard = ({ movie }) => {
    return (
        <Card bg="dark" text="white" className="h-100">
            <Card.Img variant="top" src={movie.ImagePath}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.object.isRequired,
        Genre: PropTypes.object.isRequired,
    }).isRequired
  };