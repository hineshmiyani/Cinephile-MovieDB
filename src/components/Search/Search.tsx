import React, { useState, KeyboardEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, InputBase, Theme, Box } from "@mui/material";
import { styled } from "@mui/styles";
import { useAppDispatch } from "../../app/hooks";
import { searchMovie, selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useLocation } from "react-router-dom";

const SearchContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginBottom: "12px",
  [theme.breakpoints.up("sm")]: {
    width: "300px",
    marginBottom: 0,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.mode === "light" ? "black" : "white",
    filter: theme.palette.mode === "light" ? "invert(1)" : "invert(0)",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 0.5, 0.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
  },
}));

const Search = () => {
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      dispatch(selectGenreOrCategory(""));
      dispatch(searchMovie(query));
    }
  };

  if (location?.pathname !== "/") return null;

  return (
    <>
      <SearchContainer sx={{ width: { xs: "100%", sm: "200px", md: "300px" } }}>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: { xs: "20px", sm: "24px" } }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search a movie...'
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchContainer>
    </>
  );
};

export default Search;
