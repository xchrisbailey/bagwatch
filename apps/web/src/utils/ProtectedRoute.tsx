import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
  return props.isAuthenticated ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
