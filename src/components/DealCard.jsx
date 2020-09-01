import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateDealStage } from '../actions/deals';

const DealCard = ({
  id,
  videoName,
  videoAmount,
  videoDuration,
  customer_id,
  contact: { customers },
  updateDealStage,
  deal_stage,
  deal_stage_length,
  idle,
}) => {
  const goUp = (e) => {
    updateDealStage({ id, deal_stage: deal_stage - 1 });
  };
  const goDown = (e) => {
    if (deal_stage + 1 === deal_stage_length - 1) {
      var customer = customers.find(
        (c) => String(c.id) === String(customer_id)
      );
      if (
        customer.happyCustomer &&
        customer.repeatedCustomer &&
        customer.expectedVideos &&
        customer.lostUser
      )
        return updateDealStage({ id, deal_stage: deal_stage + 1 });
      return alert('Need causes to add to lost stage');
    }
    return updateDealStage({ id, deal_stage: deal_stage + 1 });
  };
  return (
    <Fragment>
      <div
        className='card p-2'
        style={{
          width: '20rem',
          backgroundColor:
            idle && idle === 'orange'
              ? '#ffa500'
              : idle === 'red'
              ? '#ff5555'
              : null,
        }}
      >
        <td>
          <b>Video Name:</b>{' '}
          <Link style={{ color: 'blue' }} to={`/video/${id}`}>
            {videoName}{' '}
          </Link>
        </td>
        <td className='px-2'> </td>
        <td>
          <b>Amount:</b> {videoAmount}{' '}
        </td>
        <td className='px-2'> </td>
        <td>
          <button
            className='mr-3 px-4'
            disabled={deal_stage == 0 ? true : false}
            onClick={(e) => goUp(e)}
          >
            <i class='lni lni-arrow-up'></i>
          </button>
          <button
            className='mr-3 px-4'
            disabled={deal_stage == deal_stage_length - 1 ? true : false}
            onClick={(e) => goDown(e)}
          >
            <i class='lni lni-arrow-down'></i>
          </button>
        </td>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  contact: state.customer,
});

export default connect(mapStateToProps, { updateDealStage })(DealCard);
