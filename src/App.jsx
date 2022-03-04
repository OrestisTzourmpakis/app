import "./App.css";
import { UserContextProvider } from "./contexts/userContext";
import { mainRoutes } from "./routes";
import ConfirmationDialogContextProvider from "./contexts/confirmationDialogContext";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {},
});

function App() {
  // const { setUserContextObject, authed } = useContext(UserContext);
  const routes = mainRoutes();
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <ConfirmationDialogContextProvider>
            <CssBaseline />
            {[routes]}
          </ConfirmationDialogContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
