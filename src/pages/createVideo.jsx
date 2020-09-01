import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newVideo } from '../actions/deals';
import { getLanguages } from '../actions/language';
import { findPossibleCreators, getCreators } from '../actions/creator';
import { getOperators } from '../actions/auth';
const CreateVideo = ({
  newVideo,
  getLanguages,
  getCreators,
  findPossibleCreators,
  getOperators,
  match,
  language: { languages },
  creator: { creators },
  auth: { users },
}) => {
  const [formData, setFormData] = useState({
    videoName: '',
    videoDuration: '',
    videoAmount: '',
    advancedPayment: '',
    customer_id: match.params.id,
    assigned_to: '',
    videoOperator: '',
    language: '',
    script: '',
    deal_stage: 0,
  });
  const { videoName, language, assigned_to, videoOperator } = formData;

  useEffect(() => {
    getLanguages();
    getCreators();
    getOperators();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    newVideo(formData);
  };
  return (
    languages &&
    creators &&
    users && (
      <Fragment>
        <div className='container mt-5'>
          <form className='form form-signin' onSubmit={(e) => onSubmit(e)}>
            <input
              type='text'
              className='form-control mb-4'
              placeholder='Video Name'
              required
              autoFocus
              name='videoName'
              value={videoName}
              onChange={(e) => onChange(e)}
            />
            <select
              className='form-control mb-4'
              name='videoOperator'
              value={videoOperator}
              required
              onChange={(e) => onChange(e)}
            >
              <option value='' default disabled>
                Choose Operator
              </option>
              {users.map((u) => (
                <option
                  value={u._id}
                >{`${u.firstName} ${u.middleName} ${u.lastName}`}</option>
              ))}
            </select>
            <select
              className='form-control mb-4'
              name='language'
              required
              value={language}
              onChange={(e) => onChange(e)}
            >
              <option value='' default disabled>
                Choose Language
              </option>
              {languages.map((l) => (
                <option value={l.languageName}>{l.languageName}</option>
              ))}
            </select>

            <select
              className='form-control mb-4'
              name='assigned_to'
              value={assigned_to}
              required
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
            <button className='btn btn-primary' type='submit'>
              Create
            </button>
          </form>
          <button
            className='btn btn-primary'
            onClick={(e) =>
              language
                ? findPossibleCreators(language)
                : alert('Select Language')
            }
          >
            Check creators
          </button>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  creator: state.creator,
  auth: state.user,
});

export default connect(mapStateToProps, {
  newVideo,
  getLanguages,
  getCreators,
  findPossibleCreators,
  getOperators,
})(CreateVideo);
