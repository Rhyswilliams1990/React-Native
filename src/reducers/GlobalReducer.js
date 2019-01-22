import {
    LOCATION_ALLOWED
     } from '../actions/types';


const INITIAL_STATE = {
   locationAllowed: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case LOCATION_ALLOWED:            
            return { ...state, locationAllowed: action.payload };       
        default:
            return state;
    }
};
