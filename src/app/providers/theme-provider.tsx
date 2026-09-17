import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tmsTheme } from "../../shared/config/tmsTheme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiThemeProvider theme={tmsTheme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
