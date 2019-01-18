import { NEARBY_AGENT_FETCH_SUCCESS } from '../actions/types';

import userData from './UserData.json';

const INITIAL_STATE = {
    agents: [],
    user: userData
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEARBY_AGENT_FETCH_SUCCESS:            
            return { ...state, agents: action.payload };       
        default:
            return state;
    }
};
