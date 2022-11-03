import { useEffect, useState } from "react";
import { Box, CircularProgress, Theme, Typography, useMediaQuery } from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { MovieList, MoviePagination } from "../index";

const Movies = () => {
  const lg = useMediaQuery((theme: Theme) => theme.breakpoints.only("lg"));
  const numberOfMovies = lg ? 16 : 18;

  const [page, setPage] = useState(1);

  const { genreIdOrCategoryName, searchQuery } = useAppSelector(
    (state: RootState) => state.currentGenreOrCategory,
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  useEffect(() => {
    setPage(1);
  }, [genreIdOrCategoryName, searchQuery]);

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

  return (
    <>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <MoviePagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </>
  );
};

export default Movies;
