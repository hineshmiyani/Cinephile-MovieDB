import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { userSelector } from "../../features/auth";
import { useAppSelector } from "../../app/hooks";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";

const Profile = () => {
  const { user } = useAppSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavoritesMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user?.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchListMovies, refetch: refetchWatchListedMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user?.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  useEffect(() => {
    refetchFavoritesMovies();
    refetchWatchListedMovies();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h5' fontWeight='500'>
          My Profile
        </Typography>
        <Button color='primary' variant='outlined' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>

      {!(favoriteMovies && favoriteMovies?.results?.length > 0) &&
      !(watchListMovies && watchListMovies?.results?.length > 0) ? (
        <Typography variant='h6'>
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies} />
          <RatedCards title='WatchList' data={watchListMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
