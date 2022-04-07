import 'virtual:windi.css';

import { render } from 'solid-js/web';

import { Router } from 'solid-app-router';

import App from "./App";

const appDiv = document.getElementById('app');

if (appDiv) {
  render(() => <Router> <App /> </Router>, appDiv);
}
