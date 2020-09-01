import React, { Fragment, useState } from 'react';
import { editActivity } from '../actions/activity';
import { connect } from 'react-redux';

const EditActivity = ({ match, history, editActivity }) => {
  const [formData, setFormData] = useState({
    activity_id: match.params.id,
    type: '',
    status: '',
    description: '',
    completeComment: '',
  });
  const { type, status, description, completeComment } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editActivity({ formData, history });
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin' onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            placeholder='Type'
            required
            className='form-control mb-4'
            name='type'
            value={type}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Status'
            required
            className='form-control mb-4'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Description'
            required
            className='form-control mb-4'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Complete Comment'
            required
            className='form-control mb-4'
            name='completeComment'
            value={completeComment}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-primary' type='submit'>
            Update Activity
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { editActivity })(EditActivity);
