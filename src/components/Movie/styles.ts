import { Theme, SxProps } from "@mui/material";

interface IStyles {
  movie: SxProps;
  links: SxProps<Theme>;
  title: SxProps<Theme>;
}

export const styles: IStyles = {
  movie: {
    p: "10px",
  },
  links: (theme: Theme) => ({
    "& .links": {
      alignItems: "center",
      fontWeight: "bolder",
      display: { xs: "flex" },
      flexDirection: { xs: "column" },
      textDecoration: "none",
      "&:hover": {
        cursor: "pointer",
      },
    },
    "& .image": {
      borderRadius: "8px",
      height: { xs: "330px", sm: "280px" },
      marginBottom: "10px",
      boxShadow:
        theme.palette.mode === "dark"
          ? "rgba(50, 50, 93, 0.3) 0px 19px 38px, rgba(50, 50, 93, 0.22) 0px 15px 12px"
          : "rgb(38, 57, 77) 0px 20px 30px -10px",
      // boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  }),
  title: (theme: Theme) => ({
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width: "186px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    mt: "10px",
    mb: 0,
    textAlign: "center",
  }),
};
