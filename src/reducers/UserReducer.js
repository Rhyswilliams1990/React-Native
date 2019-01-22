import {
    USER_DETAIL_UPDATE,
    NEWU_CLEAR_EMAILS,
    NEWU_CLEAR_PASSWORDS,
    NEWU_CREATE_SUCCESS,
    NEWU_CREATE_USER,
    NEWU_CLEAR_SCREEN
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    emailValid: true,
    user: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_DETAIL_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case NEWU_CLEAR_PASSWORDS:
            return { 
                ...state, 
                error: action.payload, 
                password: '', 
                passwordRepeat: '', 
                loading: false 
            };
        case NEWU_CLEAR_EMAILS:
            return { ...state, error: action.payload, email: '', loading: false, emailValid: true };
        case NEWU_CLEAR_SCREEN:
            return INITIAL_STATE;
        case NEWU_CREATE_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case NEWU_CREATE_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};
