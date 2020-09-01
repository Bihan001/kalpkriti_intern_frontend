import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCustomer, touched } from '../actions/contact';

const CustomerCard = ({
  id,
  firstName,
  middleName,
  lastName,
  phone,
  wallet,
  canEdit,
  videoEdit,
  deleteCustomer,
  touched,
}) => {
  return (
    <Fragment>
      <td>
        {firstName + ' ' + middleName + ' ' + lastName}{' '}
        {canEdit ? (
          <Link className='pl-2' to={`/editCustomer/${id}`}>
            Edit
          </Link>
        ) : null}
        {videoEdit && wallet >= 400 ? (
          <Link className='pl-2' to={`createVideo/${id}`}>
            New Video
          </Link>
        ) : null}
      </td>
      <td>{phone}</td>
      <td>
        {wallet}{' '}
        {canEdit ? (
          <Link className='pl-2' to={`/addMoney/${id}`}>
            Add Money
          </Link>
        ) : null}
      </td>
      <td>
        <Link className='btn btn-light' to={`/history/${id}`}>
          History
        </Link>
      </td>
      <td>
        <button className='btn btn-light' onClick={(e) => deleteCustomer(id)}>
          Delete
        </button>
      </td>
      <td>
        <button className='btn btn-light' onClick={(e) => touched(id)}>
          Touched
        </button>
      </td>
      <td>
        <Link className='btn btn-light' to={`/touches/${id}`}>
          View Touches
        </Link>
      </td>
    </Fragment>
  );
};

export default connect(null, { deleteCustomer, touched })(CustomerCard);
