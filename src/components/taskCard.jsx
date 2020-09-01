import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTaskComplete, deleteTask } from '../actions/task';

const taskCard = ({
  id,
  assigned_to_name,
  assigned_to_id,
  assigned_by,
  user_id,
  user_role,
  priority,
  description,
  details,
  status,
  setTaskComplete,
  deleteTask,
}) => {
  return (
    <Fragment>
      <td>{assigned_to_name}</td>
      <td>{priority}</td>
      <td>{description}</td>
      <td>{details}</td>
      <td>{status}</td>
      <td>
        <Link to={`/viewTask/${id}`} className='btn btn-light'>
          View Task
        </Link>
      </td>
      {String(assigned_to_id) === String(user_id) && status !== 'completed' ? (
        <td>
          <button
            onClick={(e) => setTaskComplete(id)}
            className='btn btn-light'
          >
            Complete Task
          </button>
        </td>
      ) : null}
      {String(assigned_by) === String(user_id) ||
      (user_role === 'god' && assigned_by === 'system') ? (
        <td>
          <Link to={`/editTask/${id}`} className='btn btn-light'>
            Edit Task
          </Link>
        </td>
      ) : null}
      {String(assigned_by) === String(user_id) ||
      (user_role === 'god' && assigned_by === 'system') ? (
        <td>
          <button onClick={(e) => deleteTask(id)} className='btn btn-light'>
            Delete Task
          </button>
        </td>
      ) : null}
    </Fragment>
  );
};

export default connect(null, { setTaskComplete, deleteTask })(taskCard);
