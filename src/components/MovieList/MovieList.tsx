import { Grid } from "@mui/material";
import React from "react";
import { IMovies } from "../../services/interfaces";
import { Movie } from "../index";
import { styles } from "./styles";

type Props = {
  movies: IMovies;
};

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <Grid container sx={styles.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
