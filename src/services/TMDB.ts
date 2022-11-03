import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IActorDetails,
  IArgs,
  IGenres,
  IMovieInfo,
  IMovies,
  IMoviesByActorArgs,
  IMoviesRecommendationArgs,
} from "./interfaces";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query<IGenres, void>({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]
    getMovies: builder.query<IMovies, IArgs>({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Search Movie
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    //* Get Specific Movie
    getMovie: builder.query<IMovieInfo, string | undefined>({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //* Get Movie Recommandations
    getRecommendations: builder.query<IMovies, IMoviesRecommendationArgs>({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    //* Get Specific Actor Details
    getActorDetails: builder.query<IActorDetails, string | undefined>({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by actor
    getMoviesByActorId: builder.query<IMovies, IMoviesByActorArgs>({
      query: ({ id, page }) => `discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
