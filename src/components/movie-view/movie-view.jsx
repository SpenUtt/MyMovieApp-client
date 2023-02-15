import { useParams } from "react-router";
import { Link } from "react-router-dom";
//import { Button, Card } from "react-bootstrap"; I suppose this can be deleted? 
import './movie-view.scss';
import { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Button } from "react";

export const MovieView = ({ movies, username, favoriteMovies }) => {
    const { movieId } = useParams();
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user")); 
    const movie = movies.find((m) => m.id === movieId);

    const [movieExists, setMovieExists] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true)
    const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

    //add FavMovie
    
    const addFavoriteMovie = async() => {
        const favoriteMovie = await fetch(`https://api-mymovieapp.onrender.com/profiles/${user.Username}/movies/${movieId}`, {
            method: "POST", 
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        }) 
        console.log(storedToken)

        const response = await favoriteMovie.json()
        setUserFavoriteMovies(response.FavoriteMovies)
            if (response) {
                alert("Movie added to favorites");
                localStorage.setItem("user", JSON.stringify (response))
                window.location.reload();
            } else {
                alert("Something went wrong"); 
            }    
    };

    const removeFavoriteMovie = async() => {
        const favoriteMovie = await fetch(`https://api-mymovieapp.onrender.com/profiles/${user.Username}/movies/${movieId}`, {
            method: "DELETE", 
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        }) 
        const response = await favoriteMovie.json()
        console.log(response)
            if (response) {
                alert ("Movie has been removed from favorites"); 
                localStorage.setItem("user", JSON.stringify (response))
                window.location.reload(); 
            } else { 
                alert("Something went wrong");
            }
    };

    const movieAdded = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
            console.log("userFavMov", userFavoriteMovies)
            console.log("movieId", movieId)
            if (hasMovie) {
                setMovieExists(true)
            }
    };

    const movieRemoved = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
        if (hasMovie) {
            setDisableRemove(false)
        }
    };

    console.log("movieExists", movieExists)

    useEffect (() => {
        movieAdded()
        movieRemoved()
    },[])

    return (
        <Row>
            <Col md={6} className="movie-poster">
                <img className="w-100" src={movie.ImagePath} />
            </Col>
            <Col md={6}>
                <div className="movie-title">
                    <span className="value"><h2>{movie.Title}</h2></span>
                </div>
                <div className="movie-director">
                    <span className="label"><h5>Director: </h5></span>
                    <span className="value">{movie.Director.Name}<br></br></span>
                </div>
                <div className="movie-genre">
                    <span className="label"><h5>Genre: </h5></span>
                    <span className="value">{movie.Genre.Name}<br></br></span>
                </div>
                <div className="movie-description">
                    <span className="label"><h5>Description: </h5></span>
                    <span className="value">{movie.Description}<br></br><br></br></span>
                </div>
                <Link to={`/`}>
                    <button className="back-button">Back</button>
                </Link>
                <br />
                <br /> 
                <Button 
                    //className="button-add-favorite"
                    onClick={addFavoriteMovie}
                    disabled={movieExists}
                >+ Add to Favorites
                </Button>
                <br/>
                <br/>
                <Button 
                    variant="danger"
                    onClick={removeFavoriteMovie}
                    disabled={disableRemove}
                >Remove from Favorites
                </Button> 
            </Col>
        </Row>
    );
};

