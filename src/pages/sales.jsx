import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomers } from '../actions/contact';
import CustomerCard from '../components/CustomerCard';
import jsonexport from 'jsonexport';
import Pagination from '../components/Pagination';

const Sales = ({
  getCustomers,
  contact: { customers },
  auth: {
    user: {
      permissions: { contact_view: contact_view, contact_edit: contact_edit, video_edit: video_edit },
      role,
    },
  },
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);
  const [formData, setFormData] = useState({
    lead_status: '',
    dateStart: '',
    dateEnd: '',
    touchStart: '',
    touchEnd: '',
    happy: '',
    repeated: '',
    videoOngoing: '',
    filter: '',
  });
  const { lead_status, dateStart, dateEnd, happy, repeated, videoOngoing, touchStart, touchEnd } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getCustomers(formData);
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const keyUpHandle = (e) => {
    console.log(e.target.value);
    getCustomers({ ...formData, filter: e.target.value.toUpperCase() });
    // let salesTable = document.getElementById('sales');
    // let tr = salesTable.getElementsByTagName('tr');
    // for (let i = 0; i < tr.length; i++) {
    //   let name = tr[i].getElementsByTagName('td')[0];
    //   let phone = tr[i].getElementsByTagName('td')[1];
    //   if (name || phone) {
    //     let nameVal = name.textContent || name.innerHTML;
    //     let phoneVal = phone.textContent || phone.innerHTML;
    //     if (nameVal.toUpperCase().indexOf(filter) > -1 || phoneVal.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = '';
    //     } else {
    //       tr[i].style.display = 'none';
    //     }
    //   }
    // }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customers && customers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return contact_view && contact_edit && role && role != 'god' && contact_view == 'none' ? null : (
    <div className='container mt-5'>
      <input type='text' id='search' placeholder='Search Contacts' onKeyUp={(e) => keyUpHandle(e)} />
      <form
        className='form form-signin d-flex align-items-center justify-content-start flex-wrap'
        onSubmit={(e) => onSubmit(e)}>
        <div>
          <label for='lead'>Lead Status</label>
          <select
            className='form-control mb-4'
            name='lead_status'
            value={lead_status}
            id='lead'
            onChange={(e) => onChange(e)}>
            <option value='' default>
              All
            </option>
            <option value='new'>New</option>
            <option value='contacted'>Contacted</option>
            <option value='converted'>Converted</option>
            <option value='wait'>Wait</option>
            <option value='lost'>Lost</option>
            <option value='blocked'>Blocked</option>
          </select>
        </div>
        <div>
          <label for='updatefrom'>Update date(from)</label>
          <input
            type='datetime-local'
            placeholder='Date Start'
            id='updatefrom'
            className='form-control mb-4'
            name='dateStart'
            value={dateStart}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label for='updateto'>Update date(to)</label>
          <input
            type='datetime-local'
            placeholder='Date End'
            id='updateto'
            className='form-control mb-4'
            name='dateEnd'
            value={dateEnd}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label for='Happy'>Happy</label>
          <select className='form-control mb-4' name='happy' id='Happy' value={happy} onChange={(e) => onChange(e)}>
            <option value='' default>
              none
            </option>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>
        <div>
          <label for='Repeated'>Repeated</label>
          <select
            className='form-control mb-4'
            name='repeated'
            id='Repeated'
            value={repeated}
            onChange={(e) => onChange(e)}>
            <option value='' default>
              none
            </option>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>
        <div>
          <label for='ongoing'>Ongoing</label>
          <select
            className='form-control mb-4'
            name='videoOngoing'
            id='ongoing'
            value={videoOngoing}
            onChange={(e) => onChange(e)}>
            <option value='' default>
              none
            </option>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>
        <div>
          <label for='touchfrom'>Touched date(from)</label>
          <input
            type='datetime-local'
            placeholder='Touched Start'
            id='touchfrom'
            className='form-control mb-4'
            name='touchStart'
            value={touchStart}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label for='touchto'>Touched date(to)</label>
          <input
            type='datetime-local'
            placeholder='Touched End'
            id='touchto'
            className='form-control mb-4'
            name='touchEnd'
            value={touchEnd}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className='btn btn-primary mt-2' type='submit'>
          Filter
        </button>
      </form>
      <button
        className='btn btn-primary'
        onClick={() => {
          jsonexport(customers, (err, csv) => {
            if (err) return console.error(err);
            const element = document.createElement('a');
            const file = new Blob([csv], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = 'customers.txt';
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
          });
        }}>
        Export CSV
      </button>
      <table class='table' id='sales'>
        <thead>
          <tr>
            <th scope='col'>Customer Name</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts &&
            currentPosts.map((c) => (
              <tr key={c.id}>
                <CustomerCard
                  id={c.id}
                  firstName={c.firstName}
                  middleName={c.middleName}
                  lastName={c.lastName}
                  phone={c.phone}
                  wallet={c.wallet}
                  canEdit={role != 'god' && contact_edit === 'none' ? false : true}
                  videoEdit={role != 'god' && video_edit === 'none' ? false : true}
                />
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination postsPerPage={postsPerPage} totalPosts={customers && customers.length} paginate={paginate} />
    </div>
  );
};

Sales.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.customer,
  auth: state.user,
});

export default connect(mapStateToProps, { getCustomers })(Sales);
