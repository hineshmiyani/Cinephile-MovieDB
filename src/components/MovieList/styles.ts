import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

interface IStyles {
  moviesContainer: SxProps<Theme>;
}

export const styles: IStyles = {
  moviesContainer: (theme: Theme) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }),
};
