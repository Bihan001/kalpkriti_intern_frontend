import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { editTask } from '../actions/task';
const EditTask = ({ editTask, match }) => {
  const [formData, setFormData] = useState({
    id: match.params.id,
    priority: '',
    description: '',
    details: '',
    recurrence: '',
  });
  const { priority, description, details, recurrence } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editTask(formData);
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
          <select
            className='form-control mb-4'
            name='priority'
            value={priority}
            onChange={(e) => onChange(e)}
          >
            <option value='' default disabled>
              Choose Priority
            </option>
            <option value='normal'>Normal</option>
            <option value='blocker'>Blocker</option>
          </select>
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Description'
            autoFocus
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            className='form-control mb-4'
            placeholder='Details'
            autoFocus
            name='details'
            value={details}
            onChange={(e) => onChange(e)}
          />
          <select
            className='form-control mb-4'
            name='recurrence'
            value={recurrence}
            onChange={(e) => onChange(e)}
          >
            <option value='' default disabled>
              Choose Recurrence
            </option>
            <option value='none'>None</option>
            <option value='1d'>1 Day</option>
            <option value='1w'>1 Week</option>
            <option value='1m'>1 Month</option>
          </select>
          <button className='btn btn-primary' type='submit'>
            Update Task
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { editTask })(EditTask);
