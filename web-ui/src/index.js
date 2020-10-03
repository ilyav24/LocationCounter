import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./configureStore";
import "./index.css";

const store = configureStore();
require('dotenv').config()
console.log(process.env.REACT_APP_BASE_URL);

const rootElement = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(rootElement, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
