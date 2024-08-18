import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
  
root.render(
  // <Auth0Provider
  // domain="dev-01osm64dbvnrgyuh.us.auth0.com"
  // clientId="AdJQgzasZ8TkSw6MnC070iYJ4LfM11aU"

  // authorizationParams={{
  //   redirect_uri: window.location.origin,
  //   scope: 'openid profile email', // Use the minimum required scopes
  // }}  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </Auth0Provider>
);
