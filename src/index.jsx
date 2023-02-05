import React from 'react';
import { createRoot } from 'react-dom/client';

import { MainView } from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css"; // is this the correct bootstrap path?? 
import "./index.scss";

const MyMovieApp = () => {
  return <MainView />;
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyMovieApp />);

