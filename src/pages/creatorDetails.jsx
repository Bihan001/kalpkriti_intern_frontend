import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideos } from '../actions/deals';

const CreatorDetails = ({ match, getVideos, video: { videos } }) => {
  useEffect(() => {
    getVideos();
  }, []);
  return (
    videos && (
      <Fragment>
        <div className='container'>
          <table className='table'>
            <tr>
              <th>Video Name</th>
              <th>Video Duration</th>
              <th>Amount</th>
            </tr>
            {videos
              .filter((v) => String(v.assigned_to) === match.params.id)
              .map((v) => (
                <tr>
                  <td>{v.videoName}</td>
                  <td>{v.videoDuration}</td>
                  <td>{v.videoDuration <= 120 ? 400 : Math.floor((v.videoDuration - 60) / 60) * 200 + 400}</td>
                </tr>
              ))}
          </table>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  video: state.video,
});

export default connect(mapStateToProps, { getVideos })(CreatorDetails);
