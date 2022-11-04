import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

interface IStyles {
  imageLink: React.CSSProperties;
  image: React.CSSProperties;
  links: React.CSSProperties;
  genreImage: SxProps<Theme>;
}

export const styles: IStyles = {
  imageLink: {
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
  },
  image: {
    width: "70%",
  },
  links: {
    textDecoration: "none",
  },
  genreImage: (theme: Theme) => ({
    filter: theme.palette.mode === "dark" ? "invert(1)" : "",
  }),
};
