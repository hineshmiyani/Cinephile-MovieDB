import { Grid } from "@mui/material";
import React from "react";
import { IMovies } from "../../services/interfaces";
import { Movie } from "../index";
import { styles } from "./styles";

type Props = {
  movies: IMovies;
  numberOfMovies?: number;
  excludeFirst?: boolean;
};

const MovieList: React.FC<Props> = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid container sx={styles.moviesContainer}>
      {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
