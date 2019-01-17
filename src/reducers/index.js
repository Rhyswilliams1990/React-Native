import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'; 
import UserReducer from './UserReducer';
import NewListingReducer from './NewListingReducer';

export default combineReducers({
    auth: AuthReducer,
    newUser: UserReducer,
    newListing: NewListingReducer
});
