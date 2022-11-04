import { Box, Pagination, Theme, useMediaQuery } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};

const MoviePagination = ({ currentPage, setPage, totalPages }: Props) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const paginationSize = isMobile ? "small" : "large";

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Box mt={3} display='flex' justifyContent='center'>
      <Pagination
        color='primary'
        size={paginationSize}
        count={totalPages >= 500 ? 500 : totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default MoviePagination;
