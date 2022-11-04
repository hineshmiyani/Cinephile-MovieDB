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
  const [mode, setMode] = useState<PaletteMode | undefined>("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
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
