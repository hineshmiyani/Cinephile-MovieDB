import { Box, Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../../services/interface";
import { styles } from "./styles";

type Props = {
  movie: IMovie;
  i: number;
};

const Movie: React.FC<Props> = ({ movie, i }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={styles.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Box sx={styles.links}>
          <Link className='links' to={`/movie/${movie.id}`}>
            <img
              className='image'
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://www.fillmurray.com/200/300"
              }
              alt={movie.title}
            />
            <Typography sx={styles.title} variant='h6'>
              {movie.title}
            </Typography>
            <Tooltip disableTouchListener title={`${movie.vote_average} / 10`} arrow>
              <Box>
                <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
              </Box>
            </Tooltip>
          </Link>
        </Box>
      </Grow>
    </Grid>
  );
};

export default Movie;
