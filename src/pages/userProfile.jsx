import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/auth';

const UserProfile = ({ match, auth: { user }, changePassword }) => {
  const [password, setPassword] = useState('');
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changePassword(password);
  };
  return (
    user && (
      <Fragment>
        <div className='container mt-5'>
          <h3>
            Name: {user.firstName + ' ' + user.middleName + ' ' + user.lastName}
          </h3>
          <h3>Email: {user.email}</h3>
          <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
            <input
              type='password'
              className='form-control mb-4'
              placeholder='New Password'
              required
              autoFocus
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <button className='btn btn-primary' type='submit'>
              Change Password
            </button>
          </form>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { changePassword })(UserProfile);
