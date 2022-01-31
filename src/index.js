import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserContextProvider } from "./contexts/userContext";
import {ConfirmationDialogContextProvider} from "./contexts/confirmationDialogContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ConfirmationDialogContextProvider>
    <App />
      </ConfirmationDialogContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
