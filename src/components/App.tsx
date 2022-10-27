import { Box, Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./index";
import { appStyle } from "./style";

const App = () => {
  return (
    <Container maxWidth={false} sx={appStyle.root}>
      <CssBaseline />
      <Navbar />
      <Box sx={appStyle.content}>
        <Box sx={appStyle.toolbar} />
        <Routes>
          <Route path='/' element={<MovieInformation />}></Route>
          <Route path='/movie/:id' element={<Movies />}></Route>
          <Route path='/actors/:id' element={<Actors />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
