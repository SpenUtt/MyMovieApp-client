import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Menubar } from "../navbar/navbar";  
import { Row, Col } from "react-bootstrap"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './main-view.scss';
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")); 
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    
    const findSimilarMovies = (movie) => 
        movies.filter((m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id);

    function movieSearch(searchString) {
        console.log("search string", searchString)
        setFilteredMovieList(
            movies.filter((movie) => {
                return movie.Title.toLowerCase().includes(searchString.toLowerCase())
            })
        );
    }
    
    useEffect(() => {
        console.log(storedToken, token)
        if (!token) return;
        
        fetch("https://api-mymovieapp.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((movies) => { 
            setFilteredMovieList(movies);
        });
    }, [token]);

    return (
        <BrowserRouter>
            <Menubar 
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }}
                onSearch={movieSearch}
            />
            <Row className="justify-content-md-center" style={{ paddingTop: 100}}> 
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
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user)
                                            setToken(token)
                                        }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>Loading list....</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView 
                                            movies={movies} 
                                            username={user.Username} 
                                            findSimilarMovies={findSimilarMovies}
                                            favoriteMovies={user.FavoriteMovies}
                                        />
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
                                    <Col>Loading list....</Col>
                                ) : (
                                    <>
                                        {filteredMovieList.map((movie) => (
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
