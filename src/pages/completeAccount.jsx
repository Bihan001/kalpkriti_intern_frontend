import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { completeAccount } from '../actions/auth';
import { Redirect } from 'react-router-dom';

const CompleteAccount = ({ completeAccount, auth, match }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    password: '',
    phone: '',
    token: match.params.token,
  });
  const { firstName, middleName, lastName, password, phone } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    completeAccount(formData);
  };
  if (auth && auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='text-center container'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
          <h1 className='h3 mb-3 font-weight-normal'>Complete your account</h1>
          <input
            type='text'
            className='form-control mb-4'
            placeholder='First Name'
            required
            autoFocus
            name='firstName'
            value={firstName}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Middle Name'
            autoFocus
            name='middleName'
            value={middleName}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Last Name'
            required
            autoFocus
            name='lastName'
            value={lastName}
            onChange={(e) => onChange(e)}
          />
          <input
            type='password'
            className='form-control mb-4'
            placeholder='Password'
            required
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Phone Number'
            required
            autoFocus
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-lg btn-primary' type='submit'>
            Complete Account
          </button>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { completeAccount })(CompleteAccount);
