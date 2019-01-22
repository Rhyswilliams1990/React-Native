import {
    NEARBY_AGENT_FETCH_SUCCESS,
    SET_MAP_LOOKUP_PROPERTY_ADDRESS,
    SET_PROPERTY_ADDRESS,
    NEW_LISTING_UPDATE,
    UPDATE_ADDRESS_LINE } from '../actions/types';
   

const INITIAL_STATE = {
    forename: '',
    surname: '',
    email: '',
    emailConfirmation: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    ownershipType: 'leasehold',
    propertyType: 'detached',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    numberOfReceptionRooms: '',
    evaluation: null,
    agents: [],
    mapLookupAddress: null,
    address: {
        street_number: '',
        route: '',
        locality: '',
        country: '',
        postal_code: ''       
    }

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {     
        case UPDATE_ADDRESS_LINE:
            return { ...state, address: { [action.payload.prop]: action.payload.value } };   
        case NEW_LISTING_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
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
