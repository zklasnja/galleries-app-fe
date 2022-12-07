import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import AppGallery from "./pages/AppGallery";
import CreateGallery from "./pages/CreateGallery";
import AppLogin from "./pages/AppLogin";
import MyGalleries from "./pages/MyGalleries";
import AppRegister from "./pages/AppRegister";

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route {...rest}>{user.token ? children : <Redirect to="/login" />}</Route>
  );
};

const GuestRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return <Route {...rest}>{user.token ? <Redirect to="/" /> : children}</Route>;
};

export default function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <AppGallery />
      </Route>
      <AuthRoute path="/create">
        <CreateGallery />
      </AuthRoute>
      <AuthRoute path="/my-galleries">
        <MyGalleries />
      </AuthRoute>
      <GuestRoute path="/login">
        <AppLogin />
      </GuestRoute>
      <GuestRoute path="/register">
        <AppRegister />
      </GuestRoute>
    </Switch>
  );
}
