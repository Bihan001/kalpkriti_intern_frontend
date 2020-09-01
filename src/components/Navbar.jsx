import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ logout, auth: { isAuthenticated, user } }) => {
  return !user || !isAuthenticated ? null : (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='/dashboard'>
        A U T O M A T A
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavDropdown'>
        <ul className='navbar-nav'>
          {user.permissions &&
          user.role &&
          user.role != 'god' &&
          user.permissions.contact_view == 'none' ? null : (
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Sales
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <Link className='dropdown-item' to='/sales'>
                  Contact
                </Link>
                {user.role &&
                user.role != 'god' &&
                user.permissions.addUser != true ? null : (
                  <Link
                    className='dropdown-item'
                    to='/contactsImport'
                    role='button'
                  >
                    Import Contacts
                  </Link>
                )}
              </div>
            </li>
          )}
          {user.permissions &&
          user.role &&
          user.role != 'god' &&
          user.permissions.video_view == 'none' ? null : (
            <li className='nav-item dropdown'>
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdownMenuLink'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Operation
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='navbarDropdownMenuLink'
              >
                <Link className='dropdown-item' to='/creators'>
                  Creators
                </Link>
                <Link className='dropdown-item' to='/deals'>
                  Video
                </Link>
              </div>
            </li>
          )}
          {user.role && user.role != 'god' ? null : (
            <li className='nav-item'>
              <Link className='nav-link' to='/adminPortal' role='button'>
                Admin Portal
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link className='nav-link' to={`/users`} role='button'>
              Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={`/user/${user._id}`} role='button'>
              User Profile
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={`/tasks`} role='button'>
              Tasks
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='#'
              role='button'
              onClick={() => logout()}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
