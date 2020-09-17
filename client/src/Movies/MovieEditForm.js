import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.form`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  margin: 0 auto;
`;
const StyledHeader = styled.h2`
  text-align: center;
  font-size: 1.8em;
  margin-bottom: 50px;
`;

const StyledLabel = styled.label`
  font-size: 1.2em;
  margin-left: 10px;
`;

const StyledInput = styled.input`
  margin-left: 30px;
  width: 150px;
  height: 25px;
`;

const StyledButton = styled.button`
  width: 150px;
  align-self: center;
  height: 30px;
  border: none;
  background-color: #87cefa;
  font-size: 1em;
  text-transform: uppercase;
`;

const StyledTextArea = styled.textarea`
  width: 170px;
  margin-left: 30px;
`;

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: "",
};

const MovieEditForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((response) => {
        setMovie({
          title: response.data.title,
          director: response.data.director,
          metascore: parseInt(response.data.metascore),
          stars: response.data.stars.join("\n"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const changeHandler = (event) => {
    event.persist();
    let value = event.target.value;
    setMovie({
      ...movie,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedMovie = {
      ...movie,
      stars: movie.stars.split("\n"),
    };

    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, updatedMovie)
      .then((response) => {
        console.log("handlesubmit response", response);
        props.setMovieList(
          props.movieList.map((film) => {
            if (film.id === params.id) {
              return updatedMovie;
            } else {
              return film;
            }
          })
        );
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <StyledHeader>Edit Movie</StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Title:
          <StyledInput
            type="text"
            name="title"
            onChange={changeHandler}
            value={movie.title}
          />
        </StyledLabel>
        <StyledLabel>
          Director:
          <StyledInput
            type="text"
            name="director"
            onChange={changeHandler}
            value={movie.director}
          />
        </StyledLabel>
        <StyledLabel>
          Metascore:
          <StyledInput
            type="text"
            name="metascore"
            onChange={changeHandler}
            value={movie.metascore}
          />
        </StyledLabel>
        <StyledLabel>
          Stars:
          <StyledTextArea
            name="stars"
            id="stars"
            rows="3"
            cols="1"
            value={movie.stars}
            onChange={changeHandler}
          ></StyledTextArea>
        </StyledLabel>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </div>
  );
};

export default MovieEditForm;
