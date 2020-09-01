import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCustomer, addMoney } from '../actions/contact';

const AddMoney = ({
  auth: {
    user: {
      permissions: { contact_edit: contact_edit },
      role,
    },
  },
  getCustomer,
  addMoney,
  match,
  history,
}) => {
  const [formData, setFormData] = useState({
    id: match.params.id,
    amount: 0,
  });
  const [file, setFile] = useState('');
  const fileChange = (e) => {
    setFile(e.target.files[0]);
    var fileName = e.target.files[0].name;
    if (e.target.nextElementSibling != null) {
      e.target.nextElementSibling.innerText = fileName;
    }
  };
  useEffect(() => {
    getCustomer(match.params.id);
  }, []);
  const { amount } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const json = JSON.stringify(formData);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const submitData = new FormData();
    submitData.append('id', match.params.id);
    submitData.append('amount', amount);
    submitData.append('file', file);
    //setFormData({ ...formData, id: match.params.id });
    addMoney(submitData);
  };
  return contact_edit &&
    role &&
    role != 'god' &&
    role != 'admin' &&
    contact_edit == 'none' ? null : (
    <div className='container pt-5 mt-5'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <div class='custom-file'>
            <input
              type='file'
              required
              onChange={(e) => fileChange(e)}
              class='custom-file-input'
              id='customFile'
            />
            <label class='custom-file-label' for='customFile'>
              Choose file
            </label>
          </div>
          <label htmlFor='exampleFormControlInput1'>Amount</label>
          <input
            type='Number'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Add amount to wallet'
            required
            name='amount'
            value={amount}
            onChange={(e) => onChange(e)}
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
  auth: state.user,
});

export default connect(mapStateToProps, { getCustomer, addMoney })(AddMoney);
