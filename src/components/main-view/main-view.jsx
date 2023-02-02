import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("https://api-mymovieapp.onrender.com/movies")
        .then((response) => response.json())
        .then((movies) => {
            const moviesFromApi = movies.map((movie) => {
                return {
                    key: movie._id, 
                    title: movie.Title, 
                    image: movie.ImagePath,
                    description: movie.Description,
                    director: movie.Director.Name, 
                    genre: movie.Genre.Name,
                    genre_description: movie.Genre.Description
                };
            });
            setMovies(moviesFromApi);
        });
    }, []);
    
    if (!user) {
        return <LoginView />;
        
    };

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
            ))}
        </div>
    );
}
