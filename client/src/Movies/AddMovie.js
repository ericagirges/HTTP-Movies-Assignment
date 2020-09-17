import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const intialFormValues = {
  title: "",
  director: "",
  metascore: "",
  actors: "",
};

const AddMovie = ({setMovieList}) => {
  const [newMovie, setNewMovie] = useState(intialFormValues);
  const history = useHistory();

  const handleChanges = (event) => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/movies", newMovie)
      .then((response) => {
          setMovieList(response.data)
        history.push("/");
      })
      .catch((error) => {
        alert("Could not add a new friend at this time.");
      });
  };

  return (
    <div>
      <StyledHeader>Add a Movie</StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Title:
          <StyledInput
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleChanges}
          />
        </StyledLabel>
        <StyledLabel>
          Director:
          <StyledInput
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleChanges}
          />
        </StyledLabel>
        <StyledLabel>
          Metascore:
          <StyledInput
            type="text"
            name="metascore"
            value={newMovie.metascore}
            onChange={handleChanges}
          />
        </StyledLabel>
        <StyledLabel>
          Actors:
          <StyledTextArea
            name="actors"
            id="actors"
            rows="3"
            cols="1"
          ></StyledTextArea>
        </StyledLabel>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </div>
  );
};

export default AddMovie;
