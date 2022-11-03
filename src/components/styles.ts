import { SxProps } from "@mui/system";

interface IStyles {
  root: SxProps;
  toolbar: SxProps;
  content: SxProps;
}
export const styles: IStyles = {
  root: {
    display: "flex",
    height: "100%",
    p: "0px !important",
    "& .tooltip": {
      backgroundColor: "red !important",
    },
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: "1",
    padding: "2em",
    width: "100%",
  },
};
