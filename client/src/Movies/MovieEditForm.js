import React, { useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: 0,
};

const MovieEditForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        console.log("string")
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then((response) => {
            setMovie({
                title: response.data.title,
                director: response.data.director,
                metascore: parseInt(response.data.metascore),
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }, [params.id])

    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        setMovie({
            ...movie,
            [event.target.name]: value
        })

    }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((response) => {
            console.log(response)
            props.setMovieList(props.movieList.map(film => {
                if(film.id === params.id){
                    return movie
                }else{
                    return film
                }
            }))
            setLoading(false);
            history.push("/")
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return(
        <div>
            <h2>Edit Movie</h2>
        <form onClick={handleSubmit}>
            <label>Title:
            <input type="text" name="title" onChange={changeHandler} value={movie.title}/>
            </label>
            <label>Director:
                <input type="text" name="director" onChange={changeHandler} value={movie.director}/>
            </label>
            <label>Metascore:
                <input type="text" name="metascore" onChange={changeHandler} value={movie.metascore}/>
            </label>
            <button>Submit</button>
        </form>
        </div>
    )
}

export default MovieEditForm;