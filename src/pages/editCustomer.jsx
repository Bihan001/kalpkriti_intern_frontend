import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCustomer, editCustomer } from '../actions/contact';

const EditCustomer = ({
  contact: { customer },
  getCustomer,
  editCustomer,
  match,
  history,
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    id: match.params.id,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    lead_status: '',
    waitDate: '',
  });
  useEffect(() => {
    getCustomer(match.params.id);

    if (customer && customer.id === match.params.id) {
      setFormData({
        id: match.params.id,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        role: customer.role,
      });
    }
  }, []);
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    phone,
    role,
    lead_status,
    waitDate,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, id: match.params.id });
    editCustomer({ formData, history });
  };
  return user &&
    user.role != 'god' &&
    user.role != 'admin' &&
    user.permissions.contact_edit == 'none' ? null : (
    <div className='container pt-5 mt-5'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='row'>
          <div className='col-4'>
            <div className='form-group'>
              <label htmlFor='exampleFormControlInput1'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='exampleFormControlInput1'
                placeholder='Required'
                name='firstName'
                value={firstName}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <label htmlFor='exampleFormControlInput1'>Middle Name</label>
              <input
                type='text'
                className='form-control'
                id='exampleFormControlInput1'
                placeholder=''
                name='middleName'
                value={middleName}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='col-4'>
            <div className='form-group'>
              <label htmlFor='exampleFormControlInput1'>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='exampleFormControlInput1'
                placeholder='Required'
                name='lastName'
                value={lastName}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='name@example.com'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Min length should be 8'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Phone</label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='10 digits phone number'
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Role</label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Change from customer to some other role'
            name='role'
            value={role}
            onChange={(e) => onChange(e)}
          />
          <select
            className='form-control mb-4'
            name='lead_status'
            value={lead_status}
            onChange={(e) => onChange(e)}
          >
            <option value='' disabled default>
              Choose Lead Status
            </option>
            <option value=''>All</option>
            <option value='new'>New</option>
            <option value='wait'>Wait</option>
            <option value='contacted'>Contacted</option>
            <option value='lost'>Lost</option>
            <option value='blocked'>Blocked</option>
          </select>
          <input
            type='datetime-local'
            placeholder='Wait date. Only valid for wait lead status'
            className='form-control mb-4'
            name='waitDate'
            value={waitDate}
            onChange={(e) => onChange(e)}
            disabled={lead_status == 'wait' ? false : true}
          />
        </div>
        <button className='btn btn-lg btn-primary mt-3' type='submit'>
          Update
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contact: state.customer,
  auth: state.user,
});

export default connect(mapStateToProps, { getCustomer, editCustomer })(
  EditCustomer
);
