import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { editVideo } from '../actions/deals';

const EditVideo = ({ editVideo, match }) => {
  const [formData, setFormData] = useState({
    id: match.params.id,
    videoName: '',
    videoDuration: '',
  });
  const { videoName, videoDuration } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editVideo(formData);
  };
  return (
    <Fragment>
      <div className='container mt-5'>
        <form className='form form-signin' onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            className='form-control mb-3'
            placeholder='Video Name'
            name='videoName'
            value={videoName}
            onChange={(e) => onChange(e)}
          />
          <input
            type='Number'
            className='form-control mb-3'
            placeholder='Video Duration'
            name='videoDuration'
            value={videoDuration}
            onChange={(e) => onChange(e)}
          />
          <button className='btn btn-primary' type='submit'>
            Update Video
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect(null, { editVideo })(EditVideo);
