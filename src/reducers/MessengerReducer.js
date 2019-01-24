import {
    MSG_NEW_COMM_UPD,
    MSG_CLEAR_COMM
} from '../actions/types';

const INITIAL_STATE = {
    category: '',
    to: '',
    title: '',
    message: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MSG_NEW_COMM_UPD:
            return { ...state, [action.payload.prop]: action.payload.value };
        case MSG_CLEAR_COMM:
            return INITIAL_STATE;
        default:
            return state;
    }
};
