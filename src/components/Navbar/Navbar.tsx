import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { styles } from "./styles";
import { Search, Sidebar } from "../index";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser, userSelector } from "../../features/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(userSelector);
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
          <IconButton color='inherit' sx={{ ml: 1 }}>
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
                  src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                  sx={{ width: "30px", height: "30px" }}
                  alt='profile'
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
