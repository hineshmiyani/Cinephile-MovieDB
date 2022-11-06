import { Box, Typography } from "@mui/material";
import { Movie } from "..";
import { IMovie, IMovies } from "../../services/interfaces";

type Props = {
  title: string;
  data: IMovies | undefined;
};

const RatedCards = ({ title, data }: Props) => {
  return (
    <>
      {data && data?.results?.length > 0 && <Typography variant='h6'>{title}</Typography>}
      <Box
        display='flex'
        flexWrap='wrap'
        sx={{ my: "20px", justifyContent: { xs: "center", sm: "normal" } }}
      >
        {data &&
          data?.results?.length > 0 &&
          data?.results?.map((movie: IMovie, i: number) => <Movie key={i} movie={movie} i={i} />)}
      </Box>
    </>
  );
};

export default RatedCards;
