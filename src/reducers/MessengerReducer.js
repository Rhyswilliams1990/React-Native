import {
    MSG_NEW_COMM_UPD
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
        default:
            return state;
    }
};