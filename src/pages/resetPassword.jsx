import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

const ResetPassword = ({ match, resetPassword }) => {
  const [password, setPassword] = useState('');
  const onChange = (e) => {
    setPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword({ token: match.params.token, password: password });
  };
  return (
    <Fragment>
      <div className='container mt-5'>
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
  );
};

export default connect(null, { resetPassword })(ResetPassword);
