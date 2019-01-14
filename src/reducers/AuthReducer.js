import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    RESET_FORM_AFTER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case RESET_FORM_AFTER_ERROR:
            return { ...state, password: '', loading: false };   
        case LOGIN_USER:
            return { ...state, loading: true };
        default:
            return state;
    }
};
