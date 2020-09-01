import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteActivity } from '../actions/activity';
import { connect } from 'react-redux';

const ActivityCard = ({
  video_id,
  id,
  type,
  status,
  time,
  description,
  completeComment,
  deleteActivity,
}) => {
  const deleteHandle = (e) => {
    deleteActivity({ id, video_id });
  };
  return (
    <Fragment>
      <td>{type}</td>
      <td>{status}</td>
      <td>{time}</td>
      <td>{description}</td>
      <td>{completeComment}</td>
      <td>
        <Link className='btn btn-light' to={`/editActivity/${id}`}>
          Edit Activity
        </Link>
      </td>
      <td>
        <button className='btn btn-light' onClick={(e) => deleteHandle(e)}>
          Delete Activity
        </button>
      </td>
    </Fragment>
  );
};

export default connect(null, { deleteActivity })(ActivityCard);
