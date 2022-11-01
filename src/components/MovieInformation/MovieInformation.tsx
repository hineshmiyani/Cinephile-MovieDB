import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import { useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useAppDispatch } from "../../app/hooks";
import genreIcons from "../../assets/genres";
import { styles } from "./styles";
import MovieList from "../MovieList/MovieList";
import { useState } from "react";

const MovieInformation = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({ movie_id: id, list: "recommendations" });

  const [open, setOpen] = useState<boolean>(false);

  const isMovieFavorited = true;
  const isMovieWatchListed = true;

  const addToFavorites = () => {
    console.log("addToFavorites");
  };
  const addToWatchList = () => {
    console.log("addToWatchList");
  };

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong - Go back.</Link>
      </Box>
    );
  }

  return (
    <>
      <Grid container sx={styles.containerSpaceAround}>
        <Grid item sm={12} lg={4}>
          <Box
            component='img'
            sx={styles.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction='column' lg={7}>
          <Typography variant='h3' align='center' gutterBottom>
            {data?.title} ({data?.release_date?.split("-")?.[0]})
          </Typography>
          <Typography variant='h5' align='center' gutterBottom>
            {data?.tagline}
          </Typography>

          <Grid item alignItems='center' sx={styles.containerSpaceAround}>
            <Box display='flex' textAlign='center'>
              <Rating readOnly value={(data && data?.vote_average / 2) || 0} />
              <Typography variant='subtitle1' ml='10px' gutterBottom>
                {data?.vote_average.toFixed(1)} / 10
              </Typography>
            </Box>
            <Typography variant='h6' align='center' gutterBottom>
              {data?.runtime}min{" "}
              {data?.spoken_languages && data?.spoken_languages.length > 0
                ? `/ ${data?.spoken_languages?.[0]?.name}`
                : ""}
            </Typography>
          </Grid>

          <Grid item sx={styles.genresContainer}>
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                className='links'
                to='/'
                onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
              >
                <Box
                  component='img'
                  src={genreIcons[genre.name.toLowerCase() as keyof typeof genreIcons]}
                  sx={styles.genreImage}
                  height={25}
                />
                <Typography color='textPrimary' variant='subtitle1'>
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>

          <Typography variant='h5' gutterBottom sx={{ my: "10px" }}>
            Overview
          </Typography>
          <Typography sx={{ mb: "2rem" }}>{data?.overview}</Typography>

          <Typography variant='h5' gutterBottom>
            Top Cast
          </Typography>
          <Grid item container spacing={2}>
            {data &&
              data?.credits?.cast
                ?.map(
                  (character, i) =>
                    character?.profile_path && (
                      <Grid
                        key={i}
                        item
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character?.id}`}
                        sx={{ textDecoration: "none" }}
                      >
                        <Box
                          component='img'
                          sx={styles.castImage}
                          src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                          alt={character?.name}
                        />
                        <Typography color='textPrimary'>{character?.name}</Typography>
                        <Typography color='textSecondary'>
                          {character?.character?.split("/")?.[0]}
                        </Typography>
                      </Grid>
                    ),
                )
                ?.slice(0, 6)}
          </Grid>

          <Grid item container sx={{ mt: "2rem" }}>
            <Box sx={styles.buttonsContainer}>
              <Grid item xs={12} sm={6} sx={styles.buttonsContainer}>
                <ButtonGroup size='medium' variant='outlined'>
                  {data && data?.homepage && (
                    <Button
                      target='_blank'
                      rel='noopener noreferrer'
                      href={data?.homepage}
                      endIcon={<Language />}
                    >
                      Website
                    </Button>
                  )}
                  <Button
                    target='_blank'
                    rel='noopener noreferrer'
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<Movie />}
                  >
                    IMDB
                  </Button>
                  <Button href='#' endIcon={<Theaters />} onClick={() => setOpen(true)}>
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} sm={6} sx={styles.buttonsContainer}>
                <ButtonGroup size='medium' variant='outlined'>
                  <Button
                    onClick={addToFavorites}
                    endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                  >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>

                  <Button
                    onClick={addToWatchList}
                    endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                  >
                    WatchList
                  </Button>

                  <Button endIcon={<ArrowBack />} sx={{ borderColor: "primary.main" }}>
                    <Typography
                      component={Link}
                      to='/'
                      color='inherit'
                      variant='subtitle2'
                      sx={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box mt='5rem' width='100%'>
          <Typography variant='h3' align='center' gutterBottom>
            You might also like
          </Typography>
          {recommendations ? (
            <MovieList movies={recommendations} numberOfMovies={12} />
          ) : (
            <Box>Noting was found!</Box>
          )}
        </Box>

        <Modal closeAfterTransition sx={styles.modal} open={open} onClose={() => setOpen(false)}>
          {data && data?.videos?.results?.length > 0 ? (
            <iframe
              data-autoplay
              className='video'
              frameBorder='0'
              title='Trailer'
              src={`https://www.youtube.com/embed/${data?.videos?.results?.[0]?.key}`}
              data-allow='autoplay'
            />
          ) : (
            <Box>Trailer doesn&apos;t found</Box>
          )}
        </Modal>
      </Grid>
    </>
  );
};

export default MovieInformation;
