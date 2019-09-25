// Dependencies
import {combineReducers} from 'redux';

//  Reducers
import user from './user.reducer';
import services from './services.reducer';

export default combineReducers({
  user,
  services
});
