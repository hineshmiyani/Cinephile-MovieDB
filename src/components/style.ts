import { SxProps } from "@mui/system";

interface IAppSyle {
  root: SxProps;
  toolbar: SxProps;
  content: SxProps;
}
export const appStyle: IAppSyle = {
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: "1",
    padding: "2em",
  },
};
