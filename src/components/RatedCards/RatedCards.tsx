import { Box, Typography } from "@mui/material";
import { Movie } from "..";
import { IMovie, IMovies } from "../../services/interfaces";

type Props = {
  title: string;
  data: IMovies;
};

const RatedCards = ({ title, data }: Props) => {
  return (
    <>
      {data?.results?.length > 0 && (
        <Typography variant='h5' gutterBottom>
          {title}
        </Typography>
      )}
      <Box display='flex' flexWrap='wrap' sx={{ my: "20px" }}>
        {data?.results?.length > 0 &&
          data?.results?.map((movie: IMovie, i: number) => <Movie key={i} movie={movie} i={i} />)}
      </Box>
    </>
  );
};

export default RatedCards;
