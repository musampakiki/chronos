import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import Auth from "./components/Auth";
import "react-toastify/dist/ReactToastify.css";
import { createTheme } from '@material-ui/core/styles'


const App = () => {
    const { token } = useSelector((state) => state.user.data);
    const theme = createTheme({
        palette: {
            type: 'dark',
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>
        <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
        { token ? <Router /> : <Auth />}
        </ThemeProvider>
    </ThemeProvider>
  );
};

export default App;
