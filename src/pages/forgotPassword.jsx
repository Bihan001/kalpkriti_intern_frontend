import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { sendVerificationEmail } from '../actions/auth';

const ForgotPassword = ({ sendVerificationEmail }) => {
  const [email, setEmail] = useState('');
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    sendVerificationEmail(email);
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
          <input
            type='email'
            className='form-control mb-4'
            placeholder='Email'
            required
            autoFocus
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-primary' type='submit'>
            Send Verification Email
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { sendVerificationEmail })(ForgotPassword);
