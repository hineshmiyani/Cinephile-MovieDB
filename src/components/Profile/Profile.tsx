import React from "react";
import { userSelector } from "../../features/auth";
import { useAppSelector } from "../../app/hooks";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

const Profile = () => {
  const { user } = useAppSelector(userSelector);

  const favouriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterBottom>
          My Profile
        </Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {favouriteMovies.length > 0 ? (
        <Typography variant='h5'>
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>FAVOURITE MOVIES</Box>
      )}
    </Box>
  );
};

export default Profile;
