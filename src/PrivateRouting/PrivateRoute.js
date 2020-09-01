import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Takes default Route as in react-router-dom, then checks if the user is logged in or not. If not logged in, he/she is redirected to homepage /, else continues to that route.

// Already implemented these, so no changes required here as of now.

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated ? (
        !loading ? (
          <Redirect to='/' />
        ) : null
      ) : (
        <Component {...props} key={props.match.params.userName || 'empty'} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
