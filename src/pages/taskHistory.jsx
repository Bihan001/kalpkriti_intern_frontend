import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTask } from '../actions/task';
const TaskHistory = ({ getTask, task: { task }, match }) => {
  useEffect(() => {
    getTask(match.params.id);
  }, []);
  return (
    task && (
      <Fragment>
        <div className='container mt-5'>
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

export default connect(mapStateToProps, { getTask })(TaskHistory);
