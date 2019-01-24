import {
    LOCATION_ALLOWED,
    QUERY_LOCATION_PERMISSION
     } from '../actions/types';


const INITIAL_STATE = {
   locationAllowed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case QUERY_LOCATION_PERMISSION:
            return { ...state, locationAllowed: false };
        case LOCATION_ALLOWED:            
            return { ...state, locationAllowed: action.payload };       
        default:
            return state;
    }
};
