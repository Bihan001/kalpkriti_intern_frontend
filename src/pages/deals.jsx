import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVideos } from '../actions/deals';
import { getCustomers } from '../actions/contact';
import DealCard from '../components/DealCard';
import PropTypes from 'prop-types';
import { getAllTasks } from '../actions/task';

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

const Deals = ({
  deal: { videos, orange_count, red_count },
  auth: {
    user: {
      permissions: { video_view: video_view },
      role,
    },
  },
  getVideos,
  getCustomers,
  getAllTasks,
}) => {
  const [tab, setTab] = useState(1);
  useEffect(() => {
    getVideos();
    getAllTasks();
    getCustomers();
  }, []);
  return videos &&
    orange_count &&
    red_count &&
    video_view &&
    role &&
    role != 'god' &&
    role != 'admin' &&
    video_view == 'none' ? null : (
    <Fragment>
      <div className='ml-5'>
        <ul class='nav nav-tabs'>
          <li class='nav-item'>
            <Link class='nav-link' onClick={(e) => setTab(1)}>
              All
            </Link>
          </li>
          <li class='nav-item'>
            <Link class='nav-link' onClick={(e) => setTab(2)}>
              Closed
            </Link>
          </li>
          <li class='nav-item'>
            <Link class='nav-link' onClick={(e) => setTab(3)}>
              Lost
            </Link>
          </li>
        </ul>
        {role === 'god' ? (
          <div>
            <h3>{`Oranges: ${orange_count}`}</h3> <h3>{`Reds: ${red_count}`}</h3>
          </div>
        ) : null}
        {tab === 1
          ? deal_stages.slice(0, 7).map((stage) => (
              <table style={{ width: '90%' }}>
                <thead>
                  <th>{stage.toUpperCase()}</th>
                </thead>
                <tbody>
                  <div style={{ width: '90%' }} className='sideScroll overflow-auto'>
                    {videos &&
                      videos.map((vid) =>
                        deal_stages[vid.deal_stage] == stage ? (
                          <tr key={vid.id} style={{ display: 'table-cell' }}>
                            <DealCard
                              id={vid._id}
                              videoName={vid.videoName}
                              videoAmount={vid.videoAmount}
                              videoDuration={vid.videoDuration}
                              customer_id={vid.customer_id}
                              deal_stage={vid.deal_stage}
                              deal_stage_length={deal_stages.length}
                              idle={vid.idle ? vid.idle : null}
                            />
                          </tr>
                        ) : null
                      )}
                  </div>
                </tbody>
              </table>
            ))
          : tab === 2
          ? deal_stages.slice(7, 8).map((stage) => (
              <table style={{ width: '90%' }}>
                <thead>
                  <th>{stage.toUpperCase()}</th>
                </thead>
                <tbody>
                  <div style={{ width: '90%' }} className='sideScroll overflow-auto'>
                    {videos &&
                      videos.map((vid) =>
                        deal_stages[vid.deal_stage] == stage ? (
                          <tr key={vid.id} style={{ display: 'table-cell' }}>
                            <DealCard
                              id={vid._id}
                              videoName={vid.videoName}
                              videoAmount={vid.videoAmount}
                              videoDuration={vid.videoDuration}
                              customer_id={vid.customer_id}
                              deal_stage={vid.deal_stage}
                              deal_stage_length={deal_stages.length}
                              idle={vid.idle ? vid.idle : null}
                            />
                          </tr>
                        ) : null
                      )}
                  </div>
                </tbody>
              </table>
            ))
          : tab === 3
          ? deal_stages.slice(8, 9).map((stage) => (
              <table style={{ width: '90%' }}>
                <thead>
                  <th>{stage.toUpperCase()}</th>
                </thead>
                <tbody>
                  <div style={{ width: '90%' }} className='sideScroll overflow-auto'>
                    {videos &&
                      videos.map((vid) =>
                        deal_stages[vid.deal_stage] == stage ? (
                          <tr key={vid.id} style={{ display: 'table-cell' }}>
                            <DealCard
                              id={vid._id}
                              videoName={vid.videoName}
                              videoAmount={vid.videoAmount}
                              videoDuration={vid.videoDuration}
                              customer_id={vid.customer_id}
                              deal_stage={vid.deal_stage}
                              deal_stage_length={deal_stages.length}
                              idle={vid.idle ? vid.idle : null}
                            />
                          </tr>
                        ) : null
                      )}
                  </div>
                </tbody>
              </table>
            ))
          : null}
      </div>
    </Fragment>
  );
};

Deals.propTypes = {
  getVideos: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  deal: state.video,
  auth: state.user,
});

export default connect(mapStateToProps, {
  getVideos,
  getCustomers,
  getAllTasks,
})(Deals);
