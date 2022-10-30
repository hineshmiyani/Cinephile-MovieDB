import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useGetGenresQuery } from "../../services/TMDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import genreIcons from "../../assets/genres";
import { styles } from "./styles";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const redLogo = "https://fontmeme.com/permalink/221028/eb6befb39dc0fe52bc4141138d503521.png";
const blueLogo = "https://fontmeme.com/permalink/221028/5497c9a6731cf4c80c5033bd72a6e5c3.png";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

type Props = {
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar: React.FC<Props> = ({ setMobileOpen }) => {
  const theme = useTheme();
  const [selectedList, setSelectedList] = useState<string | number>("popular");

  const dispatch = useAppDispatch();
  const { genreIdOrCategoryName } = useAppSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching } = useGetGenresQuery();

  console.log({ genreIdOrCategoryName });

  return (
    <>
      <Link to='/' style={styles.imageLink}>
        <img
          style={styles.image}
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt='Cinephile logo'
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} to='/' style={{ ...styles.links, color: theme.palette.text.primary }}>
            <ListItem
              button
              sx={{ backgroundColor: selectedList === value ? "grey.300" : "" }}
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
                setSelectedList(value);
              }}
            >
              <ListItemIcon>
                <Box
                  component='img'
                  src={genreIcons[label.toLowerCase() as keyof typeof genreIcons]}
                  sx={styles.genreImage}
                  height={25}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center'>
            <CircularProgress size='2rem' />
          </Box>
        ) : (
          data?.genres?.map(({ name, id }) => (
            <Link key={name} to='/' style={{ ...styles.links, color: theme.palette.text.primary }}>
              <ListItem
                button
                sx={{ backgroundColor: selectedList === id ? "grey.300" : "" }}
                onClick={() => {
                  dispatch(selectGenreOrCategory(id));
                  setSelectedList(id);
                }}
              >
                <ListItemIcon>
                  <Box
                    component='img'
                    src={genreIcons[name.toLowerCase() as keyof typeof genreIcons]}
                    sx={styles.genreImage}
                    height={25}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
