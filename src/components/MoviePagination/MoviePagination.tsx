import { Box, Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
};

const MoviePagination = ({ currentPage, setPage, totalPages }: Props) => {
  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Box mt={3} display='flex' justifyContent='center'>
      <Pagination
        color='primary'
        size='large'
        count={totalPages >= 500 ? 500 : totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Box>
  );
};

export default MoviePagination;
