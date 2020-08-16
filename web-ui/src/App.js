import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./App.scss";

const loading = () => (
  <div className='animated fadeIn pt-3 text-center'>Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./containers/Authentication"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route
                  exact
                  path='/login'
                  name='Login Page'
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path='/register'
                  name='Register Page'
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path='/404'
                  name='Page 404'
                  render={(props) => <Page404 {...props} />}
                />
                <Route
                  exact
                  path='/500'
                  name='Page 500'
                  render={(props) => <Page500 {...props} />}
                />
                <Route
                  path='/'
                  name='Home'
                  render={(props) => <DefaultLayout {...props} />}
                />
              </Switch>
            </React.Suspense>
          </HashRouter>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
