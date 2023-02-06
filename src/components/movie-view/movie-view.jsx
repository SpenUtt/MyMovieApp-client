import { Button, Card } from "react-bootstrap";
import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card bg="dark" text="white" style={{ width: "62rem" }}>
            <Card.Header><h2>{movie.Title}</h2></Card.Header>
            <Card.Img src={movie.ImagePath} />
            <Card.Body>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Description: {movie.Description} </Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={onBackClick}>Back</Button>
            </Card.Footer>
        </Card>
        
    );
};

