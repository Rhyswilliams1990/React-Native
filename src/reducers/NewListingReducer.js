import { NEARBY_AGENT_FETCH_SUCCESS } from '../actions/types';


const INITIAL_STATE = {
    agents: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEARBY_AGENT_FETCH_SUCCESS:            
            return { ...state, agents: action.payload };       
        default:
            return state;
    }
};
