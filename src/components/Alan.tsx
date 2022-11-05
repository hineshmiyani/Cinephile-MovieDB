import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { IGenre } from "../services/interfaces";
import { searchMovie, selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useAppDispatch } from "../app/hooks";

const useAlan = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: "a98c614cc13d2694c089fa3d93d54fa62e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }: any) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g: IGenre) => g.name.toLowerCase() === genreOrCategory.toLowerCase(),
          );
          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre?.id));
          } else {
            const category = genreOrCategory.startsWith("top") ? "top_rated" : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          mode === "light" ? colorMode?.setMode("light") : colorMode?.setMode("dark");
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "search") {
          navigate("/");
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
  return <div>alan</div>;
};

export default useAlan;
