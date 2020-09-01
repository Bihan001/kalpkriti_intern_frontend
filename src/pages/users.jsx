import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/auth';
import User from '../components/User';

const Users = ({ getUsers, auth: { users } }) => {
  useEffect(() => {
    getUsers();
  }, []);
  const keyUpHandle = (e) => {
    let filter = e.target.value.toUpperCase();
    let usersTable = document.getElementById('users');
    let tr = usersTable.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
      let name = tr[i].getElementsByTagName('td')[0];
      let phone = tr[i].getElementsByTagName('td')[1];
      let email = tr[i].getElementsByTagName('td')[2];
      let role = tr[i].getElementsByTagName('td')[3];
      if (name || phone || phone || email) {
        let nameVal = name.textContent || name.innerHTML;
        let phoneVal = phone.textContent || phone.innerHTML;
        let emailVal = email.textContent || email.innerHTML;
        let roleVal = role.textContent || role.innerHTML;
        if (
          nameVal.toUpperCase().indexOf(filter) > -1 ||
          phoneVal.toUpperCase().indexOf(filter) > -1 ||
          emailVal.toUpperCase().indexOf(filter) > -1 ||
          roleVal.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };
  return (
    users && (
      <Fragment>
        <div className='container mt-5'>
          <input
            type='text'
            id='search'
            placeholder='Search users'
            onKeyUp={(e) => keyUpHandle(e)}
          />
          <table class='table' id='users'>
            <thead>
              <tr>
                <th scope='col'>User Name</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Email</th>
                <th scope='col'>Role</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((c) => (
                  <tr key={c._id}>
                    <User
                      id={c._id}
                      firstName={c.firstName ? c.firstName : ''}
                      middleName={c.middleName ? c.middleName : ''}
                      lastName={c.lastName ? c.lastName : ''}
                      phone={c.phone ? c.phone : ''}
                      email={c.email ? c.email : ''}
                      role={c.role ? c.role : ''}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({ auth: state.user });

export default connect(mapStateToProps, { getUsers })(Users);
