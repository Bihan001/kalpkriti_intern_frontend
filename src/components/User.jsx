import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/auth';

const User = ({
  id,
  firstName,
  middleName,
  lastName,
  phone,
  email,
  role,
  deleteUser,
}) => {
  return (
    <Fragment>
      <td>{firstName + ' ' + middleName + ' ' + lastName} </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <button className='btn btn-light' onClick={() => deleteUser(id)}>
          Delete User
        </button>
      </td>
    </Fragment>
  );
};

export default connect(null, { deleteUser })(User);
