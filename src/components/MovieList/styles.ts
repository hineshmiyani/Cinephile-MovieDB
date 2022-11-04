import { SxProps, Theme } from "@mui/material";

interface IStyles {
  moviesContainer: SxProps<Theme>;
}

export const styles: IStyles = {
  moviesContainer: (theme: Theme) => ({
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }),
};
