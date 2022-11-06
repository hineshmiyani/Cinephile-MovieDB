import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Rating,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie,
  Theaters,
} from "@mui/icons-material";
import { AlertLoginModal, MovieList, TrailerModal } from "..";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { userSelector } from "../../features/auth";
import genreIcons from "../../assets/genres";
import { styles } from "./styles";
import { IMovie, IVideo } from "../../services/interfaces";

const MovieInformation = () => {
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only("lg"));
  const buttonGroupSize = lg ? "small" : "medium";

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({
    movie_id: id,
    list: "recommendations",
  });
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user?.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user?.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const [contentText, setContentText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  const [isMovieFavorited, setIsMovieFavorited] = useState<boolean>(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<IVideo | undefined>(undefined);

  useEffect(() => {
    const findTrailer = () => {
      const trailerList =
        data &&
        data?.videos?.results?.filter((video) => video?.name?.toLowerCase()?.includes("trailer"));
      const trailer = trailerList && trailerList?.find((trailer) => trailer?.official);
      setTrailer(() => (trailer ? trailer : trailerList?.[0]));
    };
    findTrailer();
    // Reset Scroll Position
    setTimeout(() => window.scrollTo(0, 0));
  }, [data, id]);

  useEffect(() => {
    setIsMovieFavorited(
      () => !!favoriteMovies?.results?.find((movie: IMovie) => movie?.id === data?.id),
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      () => !!watchListMovies?.results?.find((movie: IMovie) => movie?.id === data?.id),
    );
  }, [watchListMovies, data]);

  const addToFavorites = async () => {
    if (user?.id) {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user?.id}/favorite?api_key=${
          process.env.REACT_APP_TMDB_KEY
        }&session_id=${localStorage.getItem("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          favorite: !isMovieFavorited,
        },
      );
      setIsMovieFavorited((prevIsMovieFavorited) => !prevIsMovieFavorited);
    } else {
      setContentText("Please login to add this movie to your favorites list.");
      setOpenLoginModal(true);
    }
  };

  const addToWatchList = async () => {
    if (user?.id) {
      await axios.post(
        `https://api.themoviedb.org/3/account/${user?.id}/watchlist?api_key=${
          process.env.REACT_APP_TMDB_KEY
        }&session_id=${localStorage.getItem("session_id")}`,
        {
          media_type: "movie",
          media_id: id,
          watchlist: !isMovieWatchListed,
        },
      );
      setIsMovieWatchListed((prevIsMovieWatchListed) => !prevIsMovieWatchListed);
    } else {
      setContentText("Please login to add this movie to your watch list.");
      setOpenLoginModal(true);
    }
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
        {/* Movie Poster Image */}
        <Grid
          item
          sm={12}
          lg={4}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mb: "30px",
          }}
        >
          <Box
            component='img'
            sx={styles.poster}
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            alt={data?.title}
          />
        </Grid>

        {/* Movie Information */}
        <Grid item container direction='column' lg={8}>
          <Typography variant='h3' align='center' gutterBottom>
            {data?.title} {data?.release_date && `(${data?.release_date?.split("-")?.[0]})`}
          </Typography>
          <Typography variant='h5' align='center' gutterBottom>
            {data?.tagline}
          </Typography>

          {/* Ratings and Movie length */}
          <Grid item alignItems='center' sx={styles.containerSpaceAround}>
            <Box display='flex' textAlign='center'>
              <Rating readOnly value={(data && data?.vote_average / 2) || 0} />
              <Typography variant='subtitle1' ml='10px' gutterBottom>
                {data?.vote_average.toFixed(1)} / 10
              </Typography>
            </Box>
            <Typography variant='h6' align='center' gutterBottom>
              {data?.runtime}min | Language: {data?.spoken_languages?.[0]?.name}
            </Typography>
          </Grid>

          {/* Genres of Movie  */}
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

          {/* Overview of movie */}
          <Typography variant='h5' gutterBottom sx={{ my: "10px" }}>
            Overview
          </Typography>
          <Typography sx={{ mb: "2rem" }} textAlign='justify'>
            {data?.overview}
          </Typography>

          {/* Cast */}
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

          {/* Button Group of Website, IMDB, Trailer, etc.. */}
          <Grid item container sx={{ mt: "2rem" }}>
            <Box sx={styles.buttonsContainer}>
              <Grid item xs={12} lg={6} sx={styles.buttonsContainer}>
                <ButtonGroup size={buttonGroupSize} variant='outlined'>
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
                  {trailer?.key && (
                    <Button href='#' endIcon={<Theaters />} onClick={() => setOpen(true)}>
                      Trailer
                    </Button>
                  )}
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} lg={6} sx={styles.buttonsContainer}>
                <ButtonGroup size={buttonGroupSize} variant='outlined'>
                  <Button
                    onClick={addToFavorites}
                    endIcon={isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />}
                  >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>

                  <Button
                    onClick={addToWatchList}
                    endIcon={isMovieWatchListed ? <Bookmark /> : <BookmarkBorder />}
                  >
                    {isMovieWatchListed ? "WatchListed" : "WatchList"}
                  </Button>

                  <Button endIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </ButtonGroup>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Movies Recommendations  */}
        <Box mt='5rem' width='100%'>
          {recommendations && recommendations?.results?.length > 0 && (
            <Typography variant='h3' align='center' gutterBottom>
              You might also like
            </Typography>
          )}
          {recommendations ? (
            <MovieList movies={recommendations} numberOfMovies={12} />
          ) : (
            <Box>Noting was found!</Box>
          )}
        </Box>

        {/* Open Trailer Modal */}
        <TrailerModal trailer={trailer} open={open} setOpen={setOpen} />

        {/* Open Alert login Modal */}
        <AlertLoginModal
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
          contentText={contentText}
        />
      </Grid>
    </>
  );
};

export default MovieInformation;
