import agentData from '../reducers/AgentData.json';

import {
    NEARBY_AGENT_FETCH_SUCCESS
} from './types';

export const getNearbyAgents = () => {
    return { type: NEARBY_AGENT_FETCH_SUCCESS, payload: agentData };
};
