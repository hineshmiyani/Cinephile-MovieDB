import { ArrowBack } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from "../../services/TMDB";
import { MovieList, MoviePagination } from "../index";
import { styles } from "./styles";

const Actors = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movieList, isFetching: isMovieListFetching } = useGetMoviesByActorIdQuery({
    id,
    page,
  });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' pt={4}>
        <Typography variant='h5' fontWeight='500' gutterBottom>
          Something has gone wrong &nbsp;
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container sx={styles.containerSpaceAround}>
        {/* Actor Image */}
        <Grid item sm={12} md={5} xl={4}>
          <Box
            component='img'
            sx={styles.image}
            src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>

        {/* Actor Information */}
        <Grid item container direction='column' md={7} xl={8} sx={{ mt: { lg: "0", xs: "8px" } }}>
          <Typography variant='h3' gutterBottom>
            {data?.name}
          </Typography>

          {data?.birthday && (
            <Typography variant='h5' gutterBottom>
              Born: &nbsp;
              {new Date(data?.birthday)?.toDateString()?.replace(" ", ", ")}
            </Typography>
          )}

          <Typography variant='body2' textAlign='justify' gutterBottom>
            {data?.biography}
          </Typography>

          <Box display='flex' justifyContent='space-around' mt='2rem'>
            <Button
              variant='outlined'
              color='primary'
              rel='noopener noreferrer'
              target='_blank'
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>
        </Grid>

        <Box mt='3rem' width='100%'>
          <Typography variant='h3' align='center' gutterBottom>
            Movies
          </Typography>
          {movieList ? (
            <>
              <MovieList movies={movieList} numberOfMovies={12}></MovieList>
              <MoviePagination
                currentPage={page}
                setPage={setPage}
                totalPages={movieList?.total_pages}
              />
            </>
          ) : (
            <Box>Nothing was found!</Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Actors;
