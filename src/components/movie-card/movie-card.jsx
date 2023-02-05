import PropTypes from "prop-types";
import './movie-card.scss'; 

var PropTypes = require('prop-types');

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
        {movie.Title}
        </div>
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