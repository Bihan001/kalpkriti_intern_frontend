import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTask } from '../actions/task';
const Task = ({ getTask, task: { task }, match }) => {
  useEffect(() => {
    getTask(match.params.id);
  }, []);
  return (
    task && (
      <Fragment>
        <div className='container mt-5'>
          <h4>Assigned to: {task.assigned_to.firstName}</h4>
          <h4>Date: {task.dateCreated}</h4>
          <h4>Priority: {task.priority}</h4>
          <h4>Description: {task.description}</h4>
          <h4>Details: {task.details}</h4>
          <h4>Status: {task.status}</h4>
          <h4>Recurrence: {task.recurrence}</h4>
          <h4>History:</h4>
          {task.history &&
            task.history.map((h) => (
              <h5>{`Time: ${h.time} Event: ${h.event}`}</h5>
            ))}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTask })(Task);
