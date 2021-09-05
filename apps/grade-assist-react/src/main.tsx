import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './app/context/auth-context';

import App from './app/app';

ReactDOM.render(
  <AuthContextProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthContextProvider>,
  document.getElementById('root')
);
