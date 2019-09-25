//  Dependencies
import moment from 'moment';

// Action Types
import {} from '../actionTypes';

const initialState = {
  data: [
    {
      date: moment().format('MMMM DD HH:MM A'),
      location: {
        from: 'Houston, TX, 33619',
        to: 'Atlanta, GA, 30123'
      },
      price: 250.00,
      onSale: false
    },
    {
      date: moment().format('MMMM DD HH:MM A'),
      location: {
        from: 'Houston, TX, 33619',
        to: 'Atlanta, GA, 30123'
      },
      price: 250.00,
      onSale: true
    },
    {
      date: moment().format('MMMM DD HH:MM A'),
      location: {
        from: 'Houston, TX, 33619',
        to: 'Atlanta, GA, 30123'
      },
      price: 250.00,
      onSale: false
    },
  ],
  isFetching: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
