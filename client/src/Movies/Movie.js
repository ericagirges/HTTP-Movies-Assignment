import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (event) => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((response) => {
      setMovieList(response.data);
      history.push("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={() => history.push(`/update-movie/${movie.id}`)}>Edit</div>
      <div className="delete-button" onClick={deleteMovie}>Delete</div>
    </div>
  );
}

export default Movie;
