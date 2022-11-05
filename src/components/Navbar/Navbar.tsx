import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { Menu, AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { Search, Sidebar } from "../index";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser, userSelector } from "../../features/auth";
import { styles } from "./styles";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(userSelector);
  const colorMode = useContext(ColorModeContext);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionIdFromLocalStorage}`,
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar sx={styles.toolbar}>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: "none" }}
              sx={styles.menuButton}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color='inherit'
            sx={{ ml: { xs: "auto", sm: 1 } }}
            onClick={colorMode?.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <Box>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/${user?.id}`}
                sx={styles.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  src={`https://www.themoviedb.org/t/p/w64_and_w64_face${user?.avatar?.tmdb?.avatar_path}`}
                  sx={{ width: "24px", height: "24px" }}
                  alt={user?.username}
                ></Avatar>
              </Button>
            )}
          </Box>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <Box>
        <Box sx={styles.drawer}>
          {isMobile ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={styles.drawerPaper}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer variant='permanent' open sx={styles.drawerPaper}>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
