import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCreator } from '../actions/creator';

const Creator = ({ creator: { creator }, getCreator, match }) => {
  useEffect(() => {
    getCreator(match.params.id);
  }, []);
  return (
    creator && (
      <Fragment>
        {creator.current_deals.map((c) => (
          <h3>{c}</h3>
        ))}
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  creator: state.creator,
});

export default connect(mapStateToProps, { getCreator })(Creator);
