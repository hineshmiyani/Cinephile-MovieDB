import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IMovie } from "../../services/interfaces";
import { styles } from "./styles";

type Props = {
  movie: IMovie;
};

const FeaturedMovie = ({ movie }: Props) => {
  if (!movie) return null;

  return (
    <Box component={Link} to={`movie/${movie?.id}`} sx={styles.featuredCardContainer}>
      <Card sx={styles.card}>
        <CardMedia
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie?.title}
          sx={styles.cardMedia}
        />
        <Box padding='20px'>
          <CardContent sx={styles.cardContent}>
            <Typography variant='h4' gutterBottom sx={styles.title}>
              {movie?.title}
            </Typography>
            <Typography variant='body2' sx={styles.overview}>
              {movie?.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
