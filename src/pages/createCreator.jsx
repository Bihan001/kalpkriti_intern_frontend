import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCreator } from '../actions/creator';
import { getLanguages } from '../actions/language';

const CreateCreator = ({
  createCreator,
  getLanguages,
  language: { languages },
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    languages_array: [],
    creator_handle: '',
    phone: '',
    email: '',
    gpay: false,
    phonepe: false,
    paytm: false,
    payment_phone: '',
    upi_id: '',
    script: false,
  });
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    creator_handle,
    payment_phone,
    upi_id,
  } = formData;
  useEffect(() => {
    getLanguages();
  }, []);
  const onChangeLanguage = (e) => {
    var languages = formData.languages_array;
    if (e.target.checked) {
      languages.unshift(e.target.value);
      console.log(languages);
    } else {
      const index = languages.indexOf(e.target.value);
      if (index > -1) {
        languages.splice(index, 1);
      }
      console.log(languages);
    }
    console.log(languages);
    setFormData({ ...formData, languages_array: languages });
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    formData.languages_array.length > 0
      ? createCreator(formData)
      : alert('Select atleast 1 language');
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
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
            autoFocus
            name='lastName'
            value={lastName}
            onChange={(e) => onChange(e)}
          />
          <h4>Add Languages</h4>
          {languages &&
            languages.map((l) => (
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value={l.languageName}
                  onChange={(e) => onChangeLanguage(e)}
                  id={l.languageName}
                />
                <label className='form-check-label' htmlFor={l.languageName}>
                  {l.languageName}
                </label>
              </div>
            ))}
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Creator Handle'
            required
            autoFocus
            name='creator_handle'
            value={creator_handle}
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
            required
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
          <button className='btn btn-primary' type='submit'>
            Create Creator
          </button>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps, { createCreator, getLanguages })(
  CreateCreator
);
