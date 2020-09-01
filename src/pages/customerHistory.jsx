import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCustomer } from '../actions/contact';

const CustomerHistory = ({ match, getCustomer, contact: { customer } }) => {
  useEffect(() => {
    getCustomer(match.params.id);
  }, []);
  return (
    customer && (
      <Fragment>
        <div className='container mt-5'>
          <div className='row'>
            {customer.wallet_history &&
              customer.wallet_history.map((w) => (
                <div className='col-3'>
                  <img className='img-fluid' src={w.reciept} />
                  <p>Date uploaded: {w.date}</p>
                  <p>Amount: {w.amount}</p>
                </div>
              ))}
          </div>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  contact: state.customer,
});

export default connect(mapStateToProps, { getCustomer })(CustomerHistory);
