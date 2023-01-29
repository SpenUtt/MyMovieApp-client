import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Movie 1",
            image: "movie1img.png",
            director: "Movie1 Director",
            genre: "movie1genre", 
            details: "Movie1 description"
        },
        {
            id: 2,
            title: "Movie 2",
            image: "movie2img.png",
            director: "Movie2 Director",
            genre: "movie2genre", 
            details: "Movie2 description" 
        },
        {
            id: 3,
            title: "Movie 3",
            image: "movie3img.png",
            director: "Movie3 Director",
            genre: "movie3genre", 
            details: "Movie3 description" 
        },
        {
            id: 4,
            title: "Movie 4",
            image: "movie4img.png",
            director: "Movie4 Director",
            genre: "movie4genre", 
            details: "Movie4 description" 
        },
        {
            id: 5,
            title: "Movie 5",
            image: "movie5img.png",
            director: "Movie5 Director",
            genre: "movie5genre", 
            details: "Movie5 description" 
        },
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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