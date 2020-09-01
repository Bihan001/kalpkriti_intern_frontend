import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/auth';
import { createTask } from '../actions/task';

const CreateTask = ({ getUsers, createTask, auth: { users } }) => {
  const [formData, setFormData] = useState({
    assigned_to: '',
    priority: '',
    description: '',
    details: '',
    recurrence: '',
    time: '',
  });
  const {
    assigned_to,
    priority,
    description,
    details,
    recurrence,
    time,
  } = formData;
  useEffect(() => {
    getUsers();
  }, []);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
  };
  return (
    users && (
      <Fragment>
        <div className='container mt-5'>
          <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
            <select
              className='form-control mb-4'
              name='assigned_to'
              value={assigned_to}
              onChange={(e) => onChange(e)}
            >
              <option value='' default disabled>
                Choose User
              </option>
              {users
                .filter(
                  (u) => u.subRole === 'sales' || u.subRole === 'operator'
                )
                .map((u) => (
                  <option
                    value={u._id}
                  >{`${u.firstName} ${u.middleName} ${u.lastName}`}</option>
                ))}
            </select>
            <select
              className='form-control mb-4'
              name='priority'
              value={priority}
              onChange={(e) => onChange(e)}
            >
              <option value='' default disabled>
                Choose Priority
              </option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
            <input
              type='datetime-local'
              placeholder='Time'
              className='form-control mb-4'
              name='time'
              value={time}
              required
              onChange={(e) => onChange(e)}
            />
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
              required
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
              <option value='1d'>Daily</option>
              <option value='1w'>Weekly</option>
              <option value='1m'>Monthly</option>
            </select>
            <button className='btn btn-primary' type='submit'>
              Create Task
            </button>
          </form>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({ auth: state.user });

export default connect(mapStateToProps, { getUsers, createTask })(CreateTask);
