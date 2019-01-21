import {
    NEARBY_AGENT_FETCH_SUCCESS,
    SET_MAP_LOOKUP_PROPERTY_ADDRESS,
    SET_PROPERTY_ADDRESS } from '../actions/types';


const INITIAL_STATE = {
    agents: [],
    mapLookupAddress: null,
    address: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PROPERTY_ADDRESS:            
            return { ...state, address: action.payload };    
        case SET_MAP_LOOKUP_PROPERTY_ADDRESS:            
            return { ...state, mapLookupAddress: action.payload };    
        case NEARBY_AGENT_FETCH_SUCCESS:            
            return { ...state, agents: action.payload };       
        default:
            return state;
    }
};
