import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { editCreator } from '../actions/creator';

const EditCreator = ({ match, editCreator }) => {
  const [formData, setFormData] = useState({
    user_id: match.params.user_id,
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    gpay: false,
    phonepe: false,
    paytm: false,
    payment_phone: '',
    upi_id: '',
    script: false,
    paymentDue: '',
  });
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    payment_phone,
    upi_id,
    paymentDue,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editCreator(formData);
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            className='form-control mb-4'
            placeholder='First Name'
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
            autoFocus
            name='lastName'
            value={lastName}
            onChange={(e) => onChange(e)}
          />
          <input
            type='email'
            className='form-control mb-4'
            placeholder='Email address'
            autoFocus
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Phone'
            autoFocus
            name='phone'
            value={phone}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Payment Phone'
            autoFocus
            name='payment_phone'
            value={payment_phone}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='UPI ID'
            autoFocus
            name='upi_id'
            value={upi_id}
            onChange={(e) => onChange(e)}
          />
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='gpay'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.gpay,
                })
              }
              id='gpay'
            />
            <label className='form-check-label' htmlFor='gpay'>
              GPay
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='phonepe'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.phonepe,
                })
              }
              id='phonepe'
            />
            <label className='form-check-label' htmlFor='phonepe'>
              PhonePe
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='paytm'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.paytm,
                })
              }
              id='paytm'
            />
            <label className='form-check-label' htmlFor='paytm'>
              Paytm
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='script'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.script,
                })
              }
              id='script'
            />
            <label className='form-check-label' htmlFor='script'>
              Script
            </label>
          </div>
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Due Payment'
            autoFocus
            name='paymentDue'
            value={paymentDue}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-primary' type='submit'>
            Edit Creator
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { editCreator })(EditCreator);
