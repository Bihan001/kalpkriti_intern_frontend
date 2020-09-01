import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  EDIT_CUSTOMER,
  ADD_MONEY,
} from '../actions/types';

const initialStates = {
  customer: null,
  customers: null,
};

export default function (state = initialStates, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload.customers,
      };
    case ADD_MONEY:
    case GET_CUSTOMER:
    case EDIT_CUSTOMER:
      return {
        ...state,
        customer: payload.customer,
      };
    default:
      return state;
  }
}
