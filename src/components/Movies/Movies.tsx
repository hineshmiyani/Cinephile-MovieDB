import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import { useAppSelector } from "../../app/hooks";
import { MovieList } from "../index";
import { RootState } from "../../app/store";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useAppSelector(
    (state: RootState) => state.currentGenreOrCategory,
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  console.log({ genreIdOrCategoryName });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (!data?.results?.length) {
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant='h4'>No movies that match that name.</Typography>
        <Typography variant='h4'>Please search for something else.</Typography>
      </Box>
    );
  }

  if (error) return <>An error has occurred.</>;

  return <>{<MovieList movies={data} />}</>;
};

export default Movies;
