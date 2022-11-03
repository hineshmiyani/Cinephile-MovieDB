import { SxProps, Theme } from "@mui/material";

interface IStyles {
  containerSpaceAround: SxProps<Theme>;
  image: SxProps<Theme>;
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
  image: (theme) => ({
    borderRadius: "8px",
    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
    width: "80%",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
      width: "auto",
      height: "450px",
      marginBottom: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      height: "auto",
      marginBottom: "30px",
    },
  }),
};
