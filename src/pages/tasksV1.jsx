import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { loadUser, getUsers } from '../actions/auth';
import { updateDealStage, getVideos } from '../actions/deals';
import { getAllTasks, getTask, getCustomTasks, setTaskComplete, deleteTask } from '../actions/task';
import { Link } from 'react-router-dom';
import { createActivity } from '../actions/activity';
import { getCreators, updatePaymentDue, editCreator } from '../actions/creator';
import { Nav, Button } from 'react-bootstrap';
import CreatorPaymentCard from '../components/creatorPaymentCard';

var deal_stages = [
  'First Call',
  'Approve Script',
  'First Video',
  'Video Approval',
  'Full Payment',
  'Deliver',
  'Payall',
  'Deal Closed',
  'Deal Lost',
];

let tmpCnt = 0;

const Layout = ({
  getAllTasks,
  getTask,
  setTaskComplete,
  getCustomTasks,
  deleteTask,
  loadUser,
  getUsers,
  getCreators,
  updatePaymentDue,
  editCreator,
  createActivity,
  updateDealStage,
  getVideos,
  task: { tasks, task },
  auth: { user, users },
  video: { video, videos },
  creator: { creator, creators },
}) => {
  const [tab, setTab] = useState();
  const [activity, setActivity] = useState({
    video_id: '',
    type: '',
    status: '',
    time: '',
    description: '',
    completeComment: '',
  });
  const [filter, setFilter] = useState({
    task_owner: '',
    task_status: 'pending',
    user_id: user._id,
  });
  const { task_owner, task_status, user_id } = filter;
  const { video_id, type, status, time, description, completeComment } = activity;
  const onChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createActivity(activity);
  };
  const onFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const onFilterSubmit = (e) => {
    e.preventDefault();
    getCustomTasks(filter);
  };
  useEffect(() => {
    loadUser();
    getUsers();
    getCustomTasks(filter);
    getCreators();
    getVideos();
  }, []);
  const tabChange = (task) => {
    getTask(task._id);
    setTab(
      task.assigned_by === 'system'
        ? 'system'
        : task.assigned_by === 'SYSTEM_PAYALL'
        ? 'SYSTEM_PAYALL'
        : task.assigned_by === 'SYSTEM_CUST'
        ? 'SYSTEM_CUST'
        : 'user'
    );
  };

  useEffect(() => {
    if (tasks.length > 0 && tmpCnt === 0) {
      tabChange(tasks[0]);
      tmpCnt += 1;
    }
  }, [tasks]);

  useEffect(() => {
    getCustomTasks(filter);
  }, [task]);

  const getNameOfCreator = (id) => {
    if (users) {
      var tmp = users.find((user) => String(user._id) === String(id));
      if (tmp) {
        return `${tmp.firstName} ${tmp.middleName} ${tmp.lastName}`;
      }
    }
  };

  var disp;

  if (tab && tab === 'user') {
    disp = (
      <div>
        <p>{`Details: ${task && task.details}`}</p>
        {task && (
          <Link className='btn btn-primary' to={`/taskHistory/${task._id}`}>
            {'  '}History
          </Link>
        )}
        {task && (
          <Link to={`/viewTask/${task._id}`} className='btn btn-light'>
            View Task
          </Link>
        )}
        {task &&
        user &&
        task.assigned_to &&
        String(task.assigned_to._id) === String(user._id) &&
        task.status !== 'completed' ? (
          <button onClick={(e) => setTaskComplete(task._id)} className='btn btn-light'>
            Complete Task
          </button>
        ) : null}
        {(task && user && String(task.assigned_by) === String(user._id)) ||
        (task && user && user.role === 'god' && task.assigned_by === 'system') ? (
          <td>
            <Link to={`/editTask/${task._id}`} className='btn btn-light'>
              Edit Task
            </Link>
          </td>
        ) : null}
        {(task && user && String(task.assigned_by) === String(user._id)) ||
        (task && user && user.role === 'god' && task.assigned_by === 'system') ? (
          <td>
            <button onClick={(e) => deleteTask(task._id)} className='btn btn-light'>
              Delete Task
            </button>
          </td>
        ) : null}
        {/* <span>Details</span>
        <Form>
          <Form.Control as='select' multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
          <br />
          <Form.Control type='text' placeholder='Comment' />
          <br />
        </Form>
        <center>
          <Button style={{ width: '100%' }}>Send</Button>
        </center> */}
      </div>
    );
  } else if (tab && tab === 'system') {
    disp = video && (
      <div>
        <div>{`Details: ${task && task.details}`}</div>
        <div>{`Description: ${task && task.description}`}</div>
        <div>{`Video ID: ${video && video._id}`}</div>
        <br />
        {task && video.videoDuration && video.deal_stage === 4 && (
          <div>
            Total duration of video: {video.videoDuration}
            <br />
            Cost of 1 min: 1000
            <br />
            {Number(video.videoDuration) - 60 > 0
              ? `Cost of remaining ${Number(video.videoDuration) - 60} seconds: ${
                  (Number(video.videoDuration) - 60) * 15
                }`
              : null}
            <br />
            Total Cost: {1000 + (Number(video.videoDuration) - 60) * 15}
          </div>
        )}
        <br />
        {task && creator && video.videoDuration && video.deal_stage === 6 && (
          <div>
            <div>Video total duration: {video.videoDuration}</div>
            <div>
              Creator total cost:{' '}
              {video.videoDuration <= 120 ? 400 : Math.floor((video.videoDuration - 60) / 60) * 200 + 400}
            </div>
            <div>{`Make payment to video team: `}</div>
            <div>{`Phone: ${creator && creator.paymentDetails.payment_phone}`}</div>
            <div>
              Methods: {creator.paymentDetails.gpay ? 'Gpay' : null}
              {', '}
              {creator.paymentDetails.phonepe ? 'Phonepe' : null}
              {', '}
              {creator.paymentDetails.paytm ? 'Paytm' : null}
            </div>
          </div>
        )}
        <br />
        {task && (
          <Link className='btn btn-primary' to={`/taskHistory/${task._id}`}>
            {'  '}History
          </Link>
        )}
        {task &&
        user &&
        task.assigned_to &&
        String(task.assigned_to._id) === String(user._id) &&
        task.status !== 'completed' ? (
          <button onClick={(e) => setTaskComplete(task._id)} className='btn btn-light'>
            Complete Task
          </button>
        ) : null}
        {task && user && user.role === 'god' && task.assigned_by === 'system' ? (
          <td>
            <button onClick={(e) => deleteTask(task._id)} className='btn btn-light'>
              Delete Task
            </button>
          </td>
        ) : null}
        {video && (
          <div>
            <label for='deal'>Change Deal Stage</label>
            <select
              className='form-control mb-4'
              style={{ width: '150px' }}
              id='deal'
              onChange={(e) =>
                updateDealStage({
                  id: video._id,
                  deal_stage: e.target.value,
                })
              }>
              {deal_stages.map((d, i) => (
                <option value={i} selected={video.deal_stage === i}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        )}
        <div style={{ border: '1px solid #000000', margin: '5px', padding: '10px' }}>
          <form className='d-flex flex-wrap align-items-start' onSubmit={(e) => onSubmit(e)}>
            <select
              className='form-control mb-4'
              style={{ width: '150px' }}
              name='status'
              value={status}
              onChange={(e) => onChange(e)}>
              <option value='' default disabled>
                Status
              </option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </select>
            <select
              className='form-control mb-4'
              style={{ width: '150px' }}
              name='type'
              value={type}
              onChange={(e) => onChange(e)}>
              <option value='' default disabled>
                Type
              </option>
              <option value='call'>Call</option>
              <option value='message'>Message</option>
            </select>
            <input
              type='datetime-local'
              placeholder='Time'
              style={{ width: '150px' }}
              className='form-control mb-4'
              name='time'
              value={time}
              onChange={(e) => onChange(e)}
            />
            <input
              type='text'
              placeholder='Description'
              style={{ width: '150px' }}
              className='form-control mb-4'
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
            />
            <input
              type='text'
              placeholder='Complete comment'
              style={{ width: '180px' }}
              className='form-control mb-4'
              name='completeComment'
              value={completeComment}
              onChange={(e) => onChange(e)}
            />
            {video && (
              <button
                className='btn btn-primary'
                type='submit'
                onClick={(e) => setActivity({ ...activity, video_id: video._id })}>
                Create Activity
              </button>
            )}
          </form>
        </div>
      </div>
    );
  } else if (tab && tab === 'SYSTEM_PAYALL') {
    disp = (
      <div>
        {task && user && user.role === 'god' && task.assigned_by === 'SYSTEM_PAYALL' ? (
          <td>
            <button onClick={(e) => deleteTask(task._id)} className='btn btn-light'>
              Delete Task
            </button>
          </td>
        ) : null}
        <table className='table'>
          <tr>
            <th>Creator</th>
            <th>Payment Mode</th>
            <th>Payment Info</th>
            <th>Amount</th>
            <th>Details</th>
            <th>Payment</th>
          </tr>
          {videos && creators && creators.map((c) => <CreatorPaymentCard c={c} videos={videos} />)}
        </table>
      </div>
    );
  } else if (tab && tab === 'SYSTEM_CUST') {
    disp = (
      <div>
        <div>{`Details: ${task && task.details}`}</div>
        <div>{`Description: ${task && task.description}`}</div>
        {task &&
        user &&
        task.assigned_to &&
        String(task.assigned_to._id) === String(user._id) &&
        task.status !== 'completed' ? (
          <button onClick={(e) => setTaskComplete(task._id)} className='btn btn-light'>
            Complete Task
          </button>
        ) : null}
      </div>
    );
  }

  return (
    tasks &&
    users &&
    user && (
      <div className='container'>
        <br />
        <form className='d-flex mb-5 align-items-end justify-content-center' onSubmit={(e) => onFilterSubmit(e)}>
          <div>
            <label for='status'>Status</label>
            <select
              style={{ width: '150px' }}
              className='form-control'
              id='status'
              name='task_status'
              value={task_status}
              onChange={(e) => onFilterChange(e)}>
              <option value='' default>
                All
              </option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </select>
          </div>
          <div>
            <label for='owner'>Created By</label>
            <select
              style={{ width: '300px' }}
              className='form-control'
              id='owner'
              name='task_owner'
              value={task_owner}
              onChange={(e) => onFilterChange(e)}>
              <option value={user._id} default>
                Myself
              </option>
              {user.role === 'god' && <option value=''>All</option>}
              {user.role === 'god' &&
                users &&
                users
                  .filter((u) => u.subRole === 'sales' || u.subRole === 'operator')
                  .map((user) => (
                    <option value={user._id}>{user.firstName + ' ' + user.middleName + ' ' + user.lastName}</option>
                  ))}
            </select>
          </div>
          <div>
            <label for='owner'>Owner</label>
            <select
              style={{ width: '300px' }}
              className='form-control'
              id='owner'
              name='user_id'
              value={user_id}
              onChange={(e) => onFilterChange(e)}>
              <option value={user._id} default>
                Myself
              </option>
              {user.role === 'god' && <option value=''>All</option>}
              {user.role === 'god' &&
                users &&
                users
                  .filter((u) => u.subRole === 'sales' || u.subRole === 'operator')
                  .map((user) => (
                    <option value={user._id}>{user.firstName + ' ' + user.middleName + ' ' + user.lastName}</option>
                  ))}
            </select>
          </div>
          <button className='btn btn-primary' type='submit'>
            Search
          </button>
          <Link className='btn btn-primary ml-4' to='/createTask'>
            Create task
          </Link>
        </form>

        <div className='row'>
          <div className='col'>
            <div variant='pills' style={{ height: '80vh', width: '500px' }} className='flex-column overflow-auto'>
              {tasks &&
                tasks
                  .filter((t) => (t.video_id ? t.video_id.deal_stage !== 7 && t.video_id.deal_stage !== 8 : true))
                  .map(
                    (task, i) =>
                      task && (
                        <Nav.Item
                          style={{
                            border: 'solid',
                            borderWidth: '0.5px',
                            borderColor: 'grey',
                          }}>
                          <Nav.Link
                            style={{
                              border: i === 0 ? '2px solid blue' : null,
                              color: '#000000',
                              backgroundColor:
                                ((task && task.isExpired === true) || (task && task.priority === 'high')) &&
                                task.status !== 'completed'
                                  ? '#ff5555'
                                  : task.isWarning === true && task.status !== 'completed'
                                  ? '#ffa500'
                                  : task.status === 'completed'
                                  ? '#55dd55'
                                  : null,
                            }}
                            onClick={(e) => {
                              let links = document.querySelectorAll('.nav-link');
                              for (let i = 0; i < links.length; i++) {
                                links[i].style.border = 'none';
                              }
                              e.target.style.border = '2px solid blue';
                              tabChange(task);
                            }}>
                            {task.description}
                            <br />
                            {`By: ${
                              task.assigned_by === 'system' ||
                              task.assigned_by === 'SYSTEM_PAYALL' ||
                              task.assigned_by === 'SYSTEM_CUST'
                                ? 'System'
                                : getNameOfCreator(task.assigned_by)
                            }, ${
                              task.assigned_to && String(task.assigned_by) !== String(task.assigned_to._id)
                                ? `To: ${task.assigned_to.firstName} ${task.assigned_to.middleName} ${task.assigned_to.lastName}`
                                : null
                            }`}
                            <br />
                            {`Created: ${task.dateCreated} Expire: ${
                              task.assigned_by === 'SYSTEM_CUST' ? 'in 30 mins' : task.dateExpire
                            }`}
                          </Nav.Link>
                        </Nav.Item>
                      )
                  )}
            </div>
          </div>
          <div
            className='col py-3 mx-2'
            style={
              task && task.assigned_by !== 'SYSTEM_PAYALL'
                ? {
                    border: 'solid',
                    borderWidth: '0.5px',
                    borderColor: 'grey',
                  }
                : null
            }>
            {task && disp}

            <br />
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
  task: state.task,
  video: state.video,
  creator: state.creator,
});

export default connect(mapStateToProps, {
  getAllTasks,
  getTask,
  setTaskComplete,
  getCustomTasks,
  deleteTask,
  loadUser,
  getUsers,
  updateDealStage,
  createActivity,
  getCreators,
  updatePaymentDue,
  editCreator,
  getVideos,
})(Layout);
