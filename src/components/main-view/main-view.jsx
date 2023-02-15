import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Menubar } from "../navbar/navbar";  
import { Row, Button, Col } from "react-bootstrap"; //remove button?
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './main-view.scss';
import { ProfileView } from "../profile.view/profile-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); 
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
                        path="/movies/:movie_Id"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} username={user.Username} favoriteMovies={user.FavoriteMovies}/>
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace /> 
                                ) : ( 
                                    <Col>
                                        <ProfileView user={user} movies={movies}/>
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
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} xl={3} lg={4} md={6}>
                                                <MovieCard 
                                                    movie={movie}
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
