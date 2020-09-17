import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import AddMovie from "./AddMovie";
import styled from "styled-components";

const StyledNav = styled.div `
  display: flex;
  flex-direction: column;
`

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <StyledNav>
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      <div className="add-button">
        <Link to="/add-movie">Add Movie</Link>
      </div>
      </StyledNav>
    </div>
  );
}

export default SavedList;
