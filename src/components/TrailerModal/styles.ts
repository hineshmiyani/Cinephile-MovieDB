import { SxProps, Theme } from "@mui/material";

interface IStyles {
  modal: SxProps<Theme>;
}

export const styles: IStyles = {
  modal: (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .video": {
      width: "60%",
      aspectRatio: "16 / 9",
      borderRadius: "8px",
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        aspectRatio: "4 / 3",
      },
    },
  }),
};
