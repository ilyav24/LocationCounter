import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { authorizationRequest } from "./containers/Auth/actions";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./App.scss";

const loading = () => (
  <div className='animated fadeIn pt-3 text-center'>Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./containers/Auth"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const App = (props) => {
  const dispatch = useDispatch();
  const { isLoading, token } = useSelector((state) => state.auth.toJS());

  useEffect(() => {
    const localToken = localStorage.getItem("lc_token");
    if (localToken) {
      dispatch(authorizationRequest(localToken));
    }
  }, []);

  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route
            exact
            path='/login'
            name='Login Page'
            render={(props) =>
              token ? <Redirect to='/' /> : <Login {...props} />
            }
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
            render={(props) => {
              if (isLoading) {
                return loading();
              }
              return token ? (
                <DefaultLayout {...props} />
              ) : (
                <Redirect to='/login' />
              );
            }}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
