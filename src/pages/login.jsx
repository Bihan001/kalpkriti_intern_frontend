import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({
  login,
  auth: {
    isAuthenticated,
    request: { loginRequest: request },
  },
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    !request && login({ email, password });
  };
  //If logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='text-center container'>
      <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
        <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Email address
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control mb-4'
          placeholder='Email address'
          required
          autoFocus
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control mb-4'
          placeholder='Password'
          required
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className='btn btn-lg btn-primary' type='submit' disabled={!isAuthenticated && request}>
          {!isAuthenticated && request ? (
            <span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <Link to='/forgotPassword'>Forgot Password?</Link>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { login })(Login);
