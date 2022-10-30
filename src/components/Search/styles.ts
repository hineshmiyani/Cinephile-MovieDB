import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

interface IStyles {
  toolbar: SxProps<Theme>;
  menuButton: SxProps;
  linkButton: SxProps;
  drawer: SxProps;
  drawerPaper: SxProps;
}

const drawerWidth = "240px";
export const styles: IStyles = {
  toolbar: (theme: Theme) => ({
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    ml: "240px",
    [theme.breakpoints.down("sm")]: {
      ml: 0,
      flexWrap: "wrap",
    },
  }),
  menuButton: {
    mr: 2,
    display: { sm: "none" },
  },
  drawer: {
    width: { sm: drawerWidth },
    flexShrink: { sm: 0 },
  },
  drawerPaper: {
    "& .MuiDrawer-paper": {
      width: { sm: drawerWidth },
    },
  },
  linkButton: {
    "&:hover": {
      color: "white !important",
      textDecoration: "none",
    },
  },
};
