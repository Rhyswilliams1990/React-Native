import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    RESET_FORM_AFTER_ERROR
} from './types';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(error => loginUserFail(dispatch, error.code));
    };
};

const getErrorMessage = (errorCode) => {
    switch(errorCode) {
        case 'auth/wrong-password':
            return 'Invalid login credentials.';
        case 'auth/invalid-email':
            return 'Invalid login credentials.';
        case 'auth/user-not-found':
            return 'Invalid login credentials.';
        case 'auth/user-disabled':
            return 'User Account is locked.'
        default:
            return 'Something went wrong';
    };
};

const loginUserFail = (dispatch, errorCode) => {

    const message = getErrorMessage(errorCode); 

    Toast.show({
        text: message,
        textStyle: { color: "white" },
        buttonText: "Okay",
        duration: 5000
    });

    dispatch({
        type: RESET_FORM_AFTER_ERROR
    });

};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    
    Actions.main({type:'reset'});
};
