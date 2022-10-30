import { Box, Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./index";
import { styles } from "./styles";

const App = () => {
  return (
    <Container maxWidth={false} sx={styles.root}>
      <CssBaseline />
      <Navbar />
      <Box sx={styles.content}>
        <Box sx={styles.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='/actors/:id' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
