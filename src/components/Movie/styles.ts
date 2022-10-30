import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

interface IStyles {
  movie: SxProps;
  links: SxProps;
  title: SxProps<Theme>;
}

export const styles: IStyles = {
  movie: {
    p: "10px",
  },
  links: {
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
      height: "280px",
      marginBottom: "10px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  },
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
