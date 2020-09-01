import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { updateDealStage } from '../actions/deals';
import { updatePaymentDue, editCreator } from '../actions/creator';
import { Link } from 'react-router-dom';

const CreatorPaymentCard = ({ updateDealStage, updatePaymentDue, editCreator, videos, c }) => {
  var payAmount = useRef();
  const payment = (creator_id) => {
    let payVal = payAmount.current.value;
    console.log(payVal);
    let vidsFilter = videos && videos.filter((v) => v.deal_stage === 6 && String(v.assigned_to) === String(creator_id));
    vidsFilter.forEach((video) => {
      let cost = video.videoDuration <= 120 ? 400 : Math.floor((video.videoDuration - 60) / 60) * 200 + 400;
      if (payVal >= cost) {
        payVal -= cost;
        console.log(payVal);
        updateDealStage({ id: video._id, deal_stage: 7 });
      }
    });
    updatePaymentDue({ user_id: creator_id, paymentDue: payVal });
  };
  const paymentWallet = (c) => {
    let tmp = c.paymentDue;
    let vidsFilter =
      videos && videos.filter((v) => v.deal_stage === 6 && String(v.assigned_to) === String(c.user_id._id));
    vidsFilter.forEach((video) => {
      let cost = video.videoDuration <= 120 ? 400 : Math.floor((video.videoDuration - 60) / 60) * 200 + 400;
      if (-tmp >= cost) {
        tmp += cost;
        updateDealStage({ id: video._id, deal_stage: 7 });
        console.log(tmp);
      }
    });
    console.log('remained:', tmp);
    editCreator({ user_id: c.user_id._id, paymentDue: tmp });
  };
  return (
    <Fragment>
      <div
        class='modal fade bd-example-modal-xl'
        id={`a${c.user_id._id}`}
        tabindex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div class='modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable' role='document'>
          <div class='modal-content'>
            <iframe src={`/creatorDetails/${c.user_id._id}`} style={{ height: 500 }}></iframe>
          </div>
        </div>
      </div>
      <tr>
        <td>{c.user_id.firstName + c.user_id.middleName + c.user_id.lastName}</td>
        <td>GPay, PhonePe, Paytm</td>
        <td>{c.user_id.phone}</td>
        <td>{-c.paymentDue}</td>
        <td>
          <button data-toggle='modal' data-target={`#a${c.user_id._id}`} className='btn btn-light'>
            Details
          </button>
        </td>
        <td className='d-flex'>
          <input ref={payAmount} type='Number' style={{ width: '60px' }} />
          <button className='btn btn-light' onClick={(e) => payment(c.user_id._id)}>
            Pay
          </button>
        </td>
        <td>
          <button className='btn btn-light' onClick={(e) => paymentWallet(c)}>
            Pay(Wallet)
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default connect(null, { updateDealStage, updatePaymentDue, editCreator })(CreatorPaymentCard);
