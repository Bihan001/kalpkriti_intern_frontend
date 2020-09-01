import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCreators } from '../actions/creator';
import CreatorCard from '../components/CreatorCard';

const Creators = ({
  getCreators,
  creator: { creators },
  auth: {
    user: {
      permissions: { video_view: video_view, video_edit: video_edit },
      role,
    },
  },
}) => {
  useEffect(() => {
    getCreators();
  }, []);
  const keyUpHandle = (e) => {
    let filter = e.target.value.toUpperCase();
    let creatorsTable = document.getElementById('creators');
    let tr = creatorsTable.getElementsByTagName('tr');
    for (let i = 0; i < tr.length; i++) {
      let name = tr[i].getElementsByTagName('td')[0];
      let phone = tr[i].getElementsByTagName('td')[1];
      if (name || phone) {
        let nameVal = name.textContent || name.innerHTML;
        let phoneVal = phone.textContent || phone.innerHTML;
        if (
          nameVal.toUpperCase().indexOf(filter) > -1 ||
          phoneVal.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };
  return video_view &&
    video_edit &&
    role &&
    role != 'god' &&
    video_view == 'none' ? null : (
    <div className='container mt-5'>
      <Link className='btn btn-primary m-3' to='/createCreator'>
        Create Creator
      </Link>
      <input
        type='text'
        id='search'
        placeholder='Search creators'
        onKeyUp={(e) => keyUpHandle(e)}
      />
      <table class='table' id='creators'>
        <thead>
          <tr>
            <th scope='col'>Creator Name</th>
            <th scope='col'>Languages</th>
            <th scope='col'>Availability</th>
            <th scope='col'>Set Availability</th>
          </tr>
        </thead>
        <tbody>
          {creators &&
            creators.map((c) => (
              <tr key={c.user_id._id}>
                <CreatorCard
                  id={c.user_id._id}
                  firstName={c.user_id.firstName ? c.user_id.firstName : ''}
                  languages={c.languages ? c.languages : ''}
                  middleName={c.user_id.middleName ? c.user_id.middleName : ''}
                  lastName={c.user_id.lastName ? c.user_id.lastName : ''}
                  totalTime={c.totalTime ? c.totalTime : 0}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  creator: state.creator,
  auth: state.user,
});

export default connect(mapStateToProps, { getCreators })(Creators);
