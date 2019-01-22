import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'; 
import UserReducer from './UserReducer';
import NewListingReducer from './NewListingReducer';
import MessengerReducer from './MessengerReducer';

export default combineReducers({
    auth: AuthReducer,
    newUser: UserReducer,
    newListing: NewListingReducer,
    messenger: MessengerReducer
});
