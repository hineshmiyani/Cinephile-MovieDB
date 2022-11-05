import { SxProps, Theme } from "@mui/material";

interface IStyles {
  featuredCardContainer: SxProps;
  card: SxProps<Theme>;
  cardMedia: SxProps;
  cardContent: SxProps;
  title: SxProps;
  overview: SxProps;
}

export const styles: IStyles = {
  featuredCardContainer: {
    m: { xs: "8px 0 30px", sm: "8px 0 20px" },
    p: { xs: "0px", sm: "10px" },
    display: "flex",
    justifyContent: "center",
    height: "490px",
    textDecoration: "none",
  },
  card: (theme: Theme) => ({
    width: "100%",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxShadow:
      theme.palette.mode === "dark"
        ? "rgba(50, 50, 93, 0.3) 0px 19px 38px, rgba(50, 50, 93, 0.22) 0px 15px 12px"
        : "rgb(38, 57, 77) 0px 20px 30px -10px",
    "&.MuiCard-root": {
      position: "relative",
    },
  }),
  cardMedia: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0,0,0.55)",
    backgroundBlendMode: "darken",
    backgroundPosition: "top center",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    color: "#fff",
    width: { xs: "100%", md: "70%", lg: "50%", xl: "40%" },
    "&.MuiCardContent-root": {
      position: "relative",
      backgroundColor: "transparent",
      p: { xs: 0, sm: "16px" },
    },
  },
  title: {
    fontWeight: "600",
    whiteSpace: { lg: "nowrap" },
  },
  overview: {
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};
