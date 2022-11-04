import { useState, useMemo, createContext, Dispatch, SetStateAction } from "react";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";

interface IColorModeContext {
  mode: PaletteMode | undefined;
  setMode: Dispatch<SetStateAction<PaletteMode | undefined>>;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<IColorModeContext | null>(null);

type Props = {
  children: JSX.Element;
};

const ToggleColorMode = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode | undefined>(() => {
    const themeModeFromLocalStorage: PaletteMode | undefined = JSON.parse(
      localStorage.getItem("theme_mode") || '"dark"',
    );
    return themeModeFromLocalStorage ? themeModeFromLocalStorage : "dark";
  });

  const toggleColorMode = () => {
    setMode((prev) => {
      const themeMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme_mode", JSON.stringify(themeMode));
      return themeMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
