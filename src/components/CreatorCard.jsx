import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  setCreatorAvailability,
  deleteCreator,
  assignVideosToCreator,
} from '../actions/creator';
import { connect } from 'react-redux';

const CreatorCard = ({
  id,
  firstName,
  middleName,
  lastName,
  totalTime,
  languages,
  setCreatorAvailability,
  deleteCreator,
  assignVideosToCreator,
}) => {
  const [formData, setFormData] = useState({
    user_id: id,
    morning: false,
    evening: false,
  });
  const assignVideos = (e) => {
    assignVideosToCreator(id);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setCreatorAvailability(formData);
  };
  const deleteHandle = (e) => {
    deleteCreator(id);
  };
  return (
    <Fragment>
      <td>{firstName + ' ' + middleName + ' ' + lastName} </td>
      <td>
        {languages ? languages.map((l) => `${l.name}: ${l.rating} `) : 'lol'}
      </td>
      <td>{`Total Time: ${totalTime}`}</td>
      <td>
        <form className='form-signin' onSubmit={(e) => onSubmit(e)}>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='morning'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.morning,
                })
              }
              id='morning'
            />
            <label className='form-check-label' htmlFor='morning'>
              Morning
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              name='evening'
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: !formData.evening,
                })
              }
              id='evening'
            />
            <label className='form-check-label' htmlFor='evening'>
              Evening
            </label>
          </div>
          <button className='btn btn-light' type='submit'>
            Update
          </button>{' '}
        </form>
      </td>
      <td>
        <Link to={`/editCreator/${id}`} className='btn btn-light'>
          Edit Creator
        </Link>
      </td>
      <td>
        <button onClick={(e) => deleteHandle(e)} className='btn btn-light'>
          Delete Creator
        </button>
      </td>
      <td>
        <Link to={`/creator/${id}`} className='btn btn-light'>
          View Tasks
        </Link>
      </td>
    </Fragment>
  );
};

export default connect(null, {
  setCreatorAvailability,
  deleteCreator,
  assignVideosToCreator,
})(CreatorCard);
