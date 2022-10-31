export interface IMovies {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface IGenres {
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IArgs {
  genreIdOrCategoryName: string | number;
  page: number;
  searchQuery: string;
}
