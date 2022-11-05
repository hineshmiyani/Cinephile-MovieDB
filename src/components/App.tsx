import { Route, Routes } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./index";
import useAlan from "./Alan";
import { styles } from "./styles";
import { useRef } from "react";

const App = () => {
  const alanBtnContainer = useRef();
  useAlan();
  return (
    <Container maxWidth={false} sx={styles.root}>
      <CssBaseline />
      <Navbar />
      <Box sx={styles.content}>
        <Box sx={styles.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/approved' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/actors/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </Box>
      <Box ref={alanBtnContainer} />
    </Container>
  );
};

export default App;
