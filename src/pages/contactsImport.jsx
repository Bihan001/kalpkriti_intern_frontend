import React, { useState } from 'react';
import { connect } from 'react-redux';
import CSVReader from 'react-csv-reader';
import { createCustomer } from '../actions/contact';
import axios from 'axios';
const ContactsImport = ({ createCustomer }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    repeatedCustomer: null,
    happyCustomer: null,
    convertedCustomer: null,
  });
  const { firstName, middleName, lastName, phone } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createCustomer(formData);
  };
  const [file, setFile] = useState([]);
  const fileHandle = (data, fileInfo) => {
    setFile(data);
  };

  // The address 52.66.132.209:5001 is of the production server. So it won't work on localhost for now. While uploading files, make sure all the localhosts in this project get changed to 52.66.132.209:5001

  const submitHandle = (e) => {
    e.preventDefault();
    let responses = [];
    let promises = [];
    for (let i = 1; i < file.length; i++) {
      promises.push(
        axios
          .post(
            'https://52.66.132.209:5001/createCustomer',
            {
              firstName: file[i][0],
              middleName: file[i][1],
              lastName: file[i][2],
              phone: file[i][3],
              convertedCustomer:
                file[i][4] == 'CONVERTED' || file[i][4] == 'REPEATED' || file[i][4] == 'HAPPY' ? true : null,
              repeatedCustomer: file[i][4] == 'REPEATED' ? true : null,
              happyCustomer: file[i][4] == 'REPEATED' || file[i][4] == 'HAPPY' ? true : null,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            var result = response.data.data;
            responses.push(result);
          })
          .catch((err) => {
            alert(err.response.data.data.error);
          })
      );
    }
    Promise.all(promises).then(() => {
      alert('done');
      console.log(responses);
    });
  };
  return (
    <div className='container'>
      <form className='text-center mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
        <h3>Create Customer</h3>
        <input
          type='text'
          className='form-control mb-4'
          placeholder='First Name'
          name='firstName'
          value={firstName}
          onChange={(e) => onChange(e)}
        />
        <input
          type='text'
          className='form-control mb-4'
          placeholder='Middle Name'
          name='middleName'
          value={middleName}
          onChange={(e) => onChange(e)}
        />
        <input
          type='text'
          className='form-control mb-4'
          placeholder='Last Name'
          name='lastName'
          value={lastName}
          onChange={(e) => onChange(e)}
        />
        <input
          type='text'
          className='form-control mb-4'
          placeholder='Phone Number'
          name='phone'
          value={phone}
          onChange={(e) => onChange(e)}
        />
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='repeatedCustomer'
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: !formData.repeatedCustomer,
              })
            }
            id='repeated'
          />
          <label className='form-check-label' htmlFor='repeated'>
            Repeated Customer?
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='happyCustomer'
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: !formData.happyCustomer,
              })
            }
            id='happy'
          />
          <label className='form-check-label' htmlFor='happy'>
            Happy Customer?
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='convertedCustomer'
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: !formData.convertedCustomer,
              })
            }
            id='converted'
          />
          <label className='form-check-label' htmlFor='converted'>
            Converted Customer?
          </label>
        </div>
        <button className='btn btn-primary' type='submit'>
          Upload
        </button>
      </form>
      <form className='text-center mt-5 pt-5' onSubmit={(e) => submitHandle(e)}>
        <h3>Select CSV with with customer details</h3>
        <CSVReader
          cssClass='my-5 ml-5'
          parserOptions={{ skipEmptyLines: true }}
          onFileLoaded={(data, fileInfo) => fileHandle(data, fileInfo)}
        />
        <button className='btn btn-primary' type='submit'>
          Upload
        </button>
      </form>
    </div>
  );
};

export default connect(null, { createCustomer })(ContactsImport);
