import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createActivity } from '../actions/activity';

const CreateActivity = ({ match, createActivity }) => {
  const [activity, setActivity] = useState({
    video_id: match.params.video_id,
    type: '',
    status: '',
    time: '',
    description: '',
    completeComment: '',
  });
  const { type, status, time, description, completeComment } = activity;
  const onChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createActivity(activity);
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form-signin' onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            placeholder='Type'
            className='form-control mb-4'
            name='type'
            value={type}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Status'
            className='form-control mb-4'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
          <input
            type='datetime-local'
            placeholder='Time'
            className='form-control mb-4'
            name='time'
            value={time}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Description'
            className='form-control mb-4'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Complete comment'
            className='form-control mb-4'
            name='completeComment'
            value={completeComment}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-primary' type='submit'>
            Create Activity
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { createActivity })(CreateActivity);
