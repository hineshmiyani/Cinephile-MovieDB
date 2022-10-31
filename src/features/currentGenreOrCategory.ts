import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGenreOrCatergoryState } from "./interfaces";

const initialState: IGenreOrCatergoryState = {
  genreIdOrCategoryName: "",
  page: 1,
  searchQuery: "",
};

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState,
  reducers: {
    selectGenreOrCategory: (state, action: PayloadAction<string | number>) => {
      state.genreIdOrCategoryName = action.payload;
      state.searchQuery = "";
    },
    searchMovie: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

// Export Actions
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

// Export Reducers
export default genreOrCategory.reducer;
