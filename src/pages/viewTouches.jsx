import React, { Fragment, useEffect } from 'react';
import { getCustomer } from '../actions/contact';
import { connect } from 'react-redux';

const Touches = ({ match, getCustomer, contact: { customer } }) => {
  useEffect(() => {
    getCustomer(match.params.id);
  }, []);
  return (
    customer && (
      <Fragment>
        {customer.touches.map((t) => (
          <h3>{t.date}</h3>
        ))}
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  contact: state.customer,
});

export default connect(mapStateToProps, { getCustomer })(Touches);
