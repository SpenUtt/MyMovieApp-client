import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Menubar from "../navbar/navbar"; //why does this line not need {}? is it only needed for multiple components? 
import { Row, Button, Col } from "react-bootstrap"; //remove button?
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './main-view.scss';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); //why are storedUser and Token not needed?
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    //const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        console.log(storedToken, token)
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
        <BrowserRouter>
            <Menubar 
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }}
            />
            <Row className="justify-content-md-center"> 
                <Routes>
                    <Route 
                        path="/signup"  
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movie={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movies) => (
                                            <Col className="mb-4" key={movies._id} xl={3} lg={4} md={6}>
                                                <MovieCard 
                                                    movie={movies}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>                        
            </Row>
        </BrowserRouter>
    );
};
