import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieEditForm from "./Movies/MovieEditForm";
import AddMovie from "./Movies/AddMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <MovieEditForm movieList={movieList} setMovieList={setMovieList}/>
      </Route>

      <Route path="/add-movie">
        <AddMovie setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
