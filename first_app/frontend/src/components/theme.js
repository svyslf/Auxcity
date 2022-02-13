import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
      primary: {
        main: '#6200ea',
        contrastText: '#fff',
      },
      secondary: {
        main: '#673ab7',
        contrastText: '#000',
      },
    },
    typography: {
      fontFamily: [
        'Archivo Black', 
      ].join(','),
    },});
export default theme;