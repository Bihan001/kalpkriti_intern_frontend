import React, { Fragment, useEffect, useState } from 'react';
import { getVideo } from '../actions/deals';
import { getActivities } from '../actions/activity';
import { updateDealStage } from '../actions/deals';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ActivityCard from '../components/ActivityCard';
import { getCustomer } from '../actions/contact';
import {
  clearAssignedCreator,
  findPossibleCreatorsinVideo,
  changeCreator,
} from '../actions/deals';

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

const Video = ({
  match,
  getVideo,
  getCustomer,
  getActivities,
  clearAssignedCreator,
  updateDealStage,
  findPossibleCreatorsinVideo,
  changeCreator,
  deals: { video },
  activity: { activities },
  creator: { creators },
  contact: { customer },
}) => {
  const [creator_user_id, setCreatorUserId] = useState('');
  const [deal_stage, setDealStage] = useState(null);
  useEffect(() => {
    getVideo(match.params.id);
    getActivities(match.params.id);
    findPossibleCreatorsinVideo(match.params.id);
  }, []);

  useEffect(() => {
    video && getCustomer(video.customer_id);
  }, [video]);

  const onChange = (e) => {
    setCreatorUserId(e.target.value);
  };
  const onDealChange = (e) => {
    setDealStage(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changeCreator({ video_id: match.params.id, creator_user_id });
  };
  const onDealSubmit = (e) => {
    e.preventDefault();
    updateDealStage({ id: match.params.id, deal_stage: deal_stage });
  };

  return (
    creators &&
    video &&
    activities &&
    customer && (
      <Fragment>
        <div className='container mt-5'>
          <h4>Video Name: {video.videoName}</h4>
          <h4>Video Duration: {video.videoDuration}</h4>
          <h4>Customer Wallet: {customer.wallet}</h4>
          <h4>Video Language: {video.language}</h4>
          <h4>Video past activity time: {video.pastActivityTime}</h4>
          <h4>Video next activity time: {video.nextActivityTime}</h4>
          <Link
            className='btn btn-primary'
            to={`/createActivity/${match.params.id}`}
          >
            CreateActivity
          </Link>
          <Link
            className='btn btn-primary ml-3'
            to={`/editVideo/${match.params.id}`}
          >
            Edit Video
          </Link>
          <Link
            className='btn btn-primary ml-3'
            to={`/addMoney/${video.customer_id}`}
          >
            Add money to customer wallet
          </Link>
          <button
            className='btn btn-primary ml-3'
            onClick={(e) => clearAssignedCreator(match.params.id)}
          >
            Clear Assigned Creator
          </button>
          <form className='form form-signin m-2' onSubmit={(e) => onSubmit(e)}>
            <select
              className='form-control mb-4'
              name='creator_user_id'
              value={creator_user_id}
              onChange={(e) => onChange(e)}
            >
              <option value='' default disabled>
                Choose Creator
              </option>
              {creators.map((c) => (
                <option
                  value={c.user_id._id}
                >{`${c.user_id.firstName} ${c.user_id.middleName} ${c.user_id.lastName}`}</option>
              ))}
            </select>
            <button
              className='btn btn-primary ml-3'
              disabled={!creator_user_id}
              type='submit'
            >
              Change Assigned Creator
            </button>
          </form>
          <form
            className='form form-signin m-2'
            onSubmit={(e) => onDealSubmit(e)}
          >
            <select
              className='form-control mb-4'
              name='deal_stage'
              value={deal_stage}
              onChange={(e) => onDealChange(e)}
            >
              <option value='' default disabled>
                Change Deal Stage
              </option>
              {deal_stages.map((deal, i) => (
                <option value={i}>{deal}</option>
              ))}
            </select>
            <button
              className='btn btn-primary ml-3'
              disabled={!deal_stage}
              type='submit'
            >
              Change Deal Stage
            </button>
          </form>
          <br />
          <h3>Activities: </h3>
          <table className='table'>
            <tr>
              <th scope='col'>Type</th>
              <th scope='col'>Status</th>
              <th scope='col'>Time</th>
              <th scope='col'>Description</th>
              <th scope='col'>Complete Comment</th>
            </tr>
            {activities.map((activity) => (
              <tr>
                <ActivityCard
                  video_id={match.params.id}
                  id={activity._id}
                  type={activity.type}
                  status={activity.status}
                  time={activity.time}
                  description={activity.description}
                  completeComment={activity.completeComment}
                />
              </tr>
            ))}
          </table>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  deals: state.video,
  creator: state.creator,
  activity: state.activity,
  contact: state.customer,
});

export default connect(mapStateToProps, {
  getVideo,
  getCustomer,
  getActivities,
  clearAssignedCreator,
  findPossibleCreatorsinVideo,
  changeCreator,
  updateDealStage,
})(Video);
