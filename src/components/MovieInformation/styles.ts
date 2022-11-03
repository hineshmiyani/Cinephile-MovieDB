import { SxProps, Theme } from "@mui/material";

interface IStyles {
  containerSpaceAround: SxProps<Theme>;
  poster: SxProps<Theme>;
  genresContainer: SxProps<Theme>;
  genreImage: SxProps<Theme>;
  castImage: SxProps;
  buttonsContainer: SxProps<Theme>;
  modal: SxProps<Theme>;
}

export const styles: IStyles = {
  containerSpaceAround: (theme: Theme) => ({
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  }),
  poster: (theme) => ({
    borderRadius: "8px",
    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
    width: "80%",
    [theme.breakpoints.down("lg")]: {
      margin: "0 auto",
      width: "auto",
      height: "auto",
      maxHeight: "500px",
      marginBottom: "30px",
    },
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "auto",
      height: "auto",
      maxHeight: "450px",
      marginBottom: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "auto",
      height: "auto",
      maxHeight: "400px",
      marginBottom: "30px",
    },
  }),
  genresContainer: (theme: Theme) => ({
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    "& .links": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "0.5rem 1rem",
      },
    },
  }),
  genreImage: (theme: Theme) => ({
    filter: theme.palette.mode === "dark" ? "invert(1)" : "dark",
    marginRight: "10px",
  }),
  castImage: {
    width: "100%",
    maxWidth: "7em",
    height: "8em",
    borderRadius: "8px",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  buttonsContainer: (theme: Theme) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      rowGap: "1rem",
    },
  }),
  modal: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .video": {
      width: "60%",
      height: "60%",
      borderRadius: "8px",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "90%",
      },
    },
  }),
};
