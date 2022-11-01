import { Grid } from "@mui/material";
import React from "react";
import { IMovies } from "../../services/interfaces";
import { Movie } from "../index";
import { styles } from "./styles";

type Props = {
  movies: IMovies;
  numberOfMovies?: number;
};

const MovieList: React.FC<Props> = ({ movies, numberOfMovies }) => {
  return (
    <Grid container sx={styles.moviesContainer}>
      {movies?.results?.slice(0, numberOfMovies)?.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
