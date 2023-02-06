import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Button, Col } from "react-bootstrap";
import './main-view.scss';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;
        
        fetch("https://api-mymovieapp.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((movies) => { 
            setMovies(movies);
        });
    }, [token]);

    return (
        <Row className="justify-content-md-center"> 
            {!user ? (
                <>
                    <Col md={5}>
                        <LoginView onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token)
                        }}
                        />
                        or
                        <SignupView />
                    </Col>
                </>
            ) : selectedMovie ? (
                <> 
                    <Col md={8}>
                        <MovieView 
                            movie={selectedMovie} 
                            onBackClick={() => setSelectedMovie(null)} 
                        />
                    </Col>
                </>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movies) => (
                    <Col className="mb-5" key={movies._id} md={3}>    
                        <MovieCard
                            movie={movies}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                    ))}
                <Button onClick={() => { 
                    setUser(null);
                    setToken(null);
                    localStorage.clear()
                }}
                >Logout</Button>
                </>
            )}
        </Row>
    );
};
