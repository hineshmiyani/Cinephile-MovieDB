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
    boxShadow:
      theme.palette.mode === "dark"
        ? "rgba(50, 50, 93, 0.3) 0px 19px 38px, rgba(50, 50, 93, 0.22) 0px 15px 12px"
        : "rgb(38, 57, 77) 0px 20px 30px -10px",
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
