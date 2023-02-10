import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Navbar } from "../navbar/navbar";
import './movie-card.scss'; 

var PropTypes = require('prop-types');

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card bg="dark" text="white" className="h-100" onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.ImagePath}/>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };