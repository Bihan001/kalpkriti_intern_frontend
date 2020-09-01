import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import { getAllTasks } from '../actions/task';
import TaskCard from '../components/taskCard';
import { Link } from 'react-router-dom';

const Tasks = ({ getAllTasks, loadUser, task: { tasks }, auth: { user } }) => {
  useEffect(() => {
    loadUser();
    getAllTasks();
  }, []);
  return (
    <div className='container mt-5'>
      <Link className='btn btn-primary' to='/createTask'>
        Create task
      </Link>
      <table class='table' id='tasks'>
        <thead>
          <tr>
            <th scope='col'>Assigned to</th>
            <th scope='col'>Priority</th>
            <th scope='col'>Description</th>
            <th scope='col'>Details</th>
            <th scope='col'>Pending/Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((t) => (
              <tr
                style={
                  t.priority == 'high' && t.status != 'completed'
                    ? { backgroundColor: '#ff5555' }
                    : t.priority == 'medium' && t.status != 'completed'
                    ? { backgroundColor: '#ffa500' }
                    : t.status === 'completed'
                    ? { backgroundColor: '#55dd55' }
                    : null
                }
                key={t._id}
              >
                <TaskCard
                  id={t._id}
                  priority={t.priority}
                  assigned_by={t.assigned_by}
                  user_id={user._id}
                  user_role={user.role}
                  assigned_to_name={t.assigned_to.firstName}
                  assigned_to_id={t.assigned_to._id}
                  description={t.description}
                  details={t.details}
                  status={t.status}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
  task: state.task,
});

export default connect(mapStateToProps, { getAllTasks, loadUser })(Tasks);
