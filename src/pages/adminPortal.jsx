import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser, loadUser } from '../actions/auth';

const AdminPortal = ({ createUser, loadUser, auth: { user } }) => {
  const [formData, setFormData] = useState({
    email: '',
    role: 'user',
    contact_view: '',
    contact_edit: '',
    video_view: '',
    video_edit: '',
    addUser: false,
    contactImport: false,
    contactExport: false,
    subRole: '',
    deal_stage_list: [],
  });
  const {
    email,
    contact_view,
    contact_edit,
    video_view,
    video_edit,
    subRole,
  } = formData;
  useEffect(() => {
    loadUser();
  }, []);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChangeDeal = (e) => {
    var deal_stages = formData.deal_stage_list;
    if (e.target.checked) {
      deal_stages.unshift(e.target.value);
      console.log(deal_stages);
    } else {
      const index = deal_stages.indexOf(e.target.value);
      if (index > -1) {
        deal_stages.splice(index, 1);
      }
      console.log(deal_stages);
    }
    console.log(deal_stages);
    setFormData({ ...formData, deal_stage_list: deal_stages });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
  };
  return user && user.role != 'god' ? null : (
    <Fragment>
      <div className='container'>
        <form className='form-signin mt-5 pt-5' onSubmit={(e) => onSubmit(e)}>
          <h1 className='h3 mb-3 font-weight-normal'>Create account</h1>
          <input
            type='email'
            className='form-control mb-4'
            placeholder='Email address'
            required
            autoFocus
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <table className='table table-borderless'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>View</th>
                <th scope='col'>Edit</th>
                <th scope='col'>Import</th>
                <th scope='col'>Export</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Contact</th>
                <td>
                  <select
                    className='form-control mb-4'
                    name='contact_view'
                    value={contact_view}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='' default disabled>
                      Choose
                    </option>
                    <option value='none'>None</option>
                    <option value='all'>All</option>
                    <option value='assigned'>Assigned</option>
                  </select>
                </td>
                <td>
                  <select
                    className='form-control mb-4'
                    name='contact_edit'
                    value={contact_edit}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='' default disabled>
                      Choose
                    </option>
                    <option value='none'>None</option>
                    <option value='all'>All</option>
                    <option value='assigned'>Assigned</option>
                  </select>
                </td>
                <td>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='contactImport'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: !formData.contactImport,
                        })
                      }
                      id='contactImport'
                    />
                    <label className='form-check-label' htmlFor='contactImport'>
                      Allow Contact Import
                    </label>
                  </div>
                </td>
                <td>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='contactExport'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: !formData.contactExport,
                        })
                      }
                      id='contactExport'
                    />
                    <label className='form-check-label' htmlFor='contactExport'>
                      Allow Contact Export
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope='row'>Video</th>
                <td>
                  <select
                    className='form-control mb-4'
                    name='video_view'
                    value={video_view}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='' default disabled>
                      Choose
                    </option>
                    <option value='none'>None</option>
                    <option value='all'>All</option>
                    <option value='assigned'>Assigned</option>
                  </select>
                </td>
                <td>
                  <select
                    className='form-control mb-4'
                    name='video_edit'
                    value={video_edit}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='' default disabled>
                      Choose
                    </option>
                    <option value='none'>None</option>
                    <option value='all'>All</option>
                    <option value='assigned'>Assigned</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope='row'>Add User</th>
                <td colSpan='2'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='addUser'
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: !formData.addUser,
                        })
                      }
                      id='addUser'
                    />
                    <label className='form-check-label' htmlFor='addUser'>
                      Allow Add User
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope='row'>Sub Role</th>
                <td colSpan='1'>
                  <select
                    className='form-control mb-4'
                    name='subRole'
                    value={subRole}
                    onChange={(e) => onChange(e)}
                  >
                    <option value='' default disabled>
                      Choose
                    </option>
                    <option value='sales'>Sales</option>
                    <option value='operator'>Operator</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th scope='row'>Deal Stages</th>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={0}
                      onChange={(e) => onChangeDeal(e)}
                      id='firstCall'
                    />
                    <label className='form-check-label' htmlFor='firstCall'>
                      First Call
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={1}
                      onChange={(e) => onChangeDeal(e)}
                      id='approveScript'
                    />
                    <label className='form-check-label' htmlFor='approveScript'>
                      Approve Script
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={2}
                      onChange={(e) => onChangeDeal(e)}
                      id='firstVideo'
                    />
                    <label className='form-check-label' htmlFor='firstVideo'>
                      First Video
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={3}
                      onChange={(e) => onChangeDeal(e)}
                      id='vidApproval'
                    />
                    <label className='form-check-label' htmlFor='vidApproval'>
                      Video Approval
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={4}
                      onChange={(e) => onChangeDeal(e)}
                      id='fullPayment'
                    />
                    <label className='form-check-label' htmlFor='fullPayment'>
                      Full Payment
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={5}
                      onChange={(e) => onChangeDeal(e)}
                      id='deliver'
                    />
                    <label className='form-check-label' htmlFor='deliver'>
                      Deliver
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={6}
                      onChange={(e) => onChangeDeal(e)}
                      id='Payall'
                    />
                    <label className='form-check-label' htmlFor='Payall'>
                      Payall
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={7}
                      onChange={(e) => onChangeDeal(e)}
                      id='dealClosed'
                    />
                    <label className='form-check-label' htmlFor='dealClosed'>
                      Deal Closed
                    </label>
                  </div>
                </td>
                <td colSpan='1'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={8}
                      onChange={(e) => onChangeDeal(e)}
                      id='dealLost'
                    />
                    <label className='form-check-label' htmlFor='dealLost'>
                      Deal Lost
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-lg btn-primary mt-3' type='submit'>
            Create
          </button>
        </form>
      </div>
    </Fragment>
  );
};

AdminPortal.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { createUser, loadUser })(AdminPortal);
