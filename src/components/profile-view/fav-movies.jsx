import { useState, useEffect } from "react";
import { Button, Col, Card, Link } from "react-bootstrap";
import { ProfileView } from "./profile-view";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({user, movies}) => {
    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");

    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const getUser = (token) => {
        fetch(`https://api-mymovieapp.onrender.com/users/${user.Username}`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        }).then(response => response.json())
        .then((response) => {
            console.log("getUser response", response)
            setUsername(response.Username);
            setEmail(response.Email);
            setPassword(response.Password);
            setBirthday(response.Birthday);
            setFavoriteMovies(response.FavoriteMovies)
        })
    }
    console.log("userFavMov", favoriteMovies)

    const favMovies = movies.filter((movie) => favoriteMovies.includes(movie._id));
    console.log("favMovies", favMovies)

    useEffect (() => {
        const newList = allMovies.filter((movie) => {
            const hasMovieId = favoriteMovies.some((m) => movie._id === m);
            if (hasMovieId) { 
                return movie
            }
        })
        setFavoriteMovies (newList)
        getUser(token);
    }, [])

    return (
        <>
            <h4>Favorite Movies: </h4>
            {/*display favorite movies*/}
            {favMovies.length === 0 ? 
                <span> No movies selected</span>
                : favMovies.map ((movie) => (
                    <Col className="mb-4" key={movie._id} xl={3} lg={4} md={6}>
                        <MovieCard movie={movie} />
                    </Col>
                ))
            }
        </>
    )
}    