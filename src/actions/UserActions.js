import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    USER_DETAIL_UPDATE,
    NEWU_CLEAR_EMAILS,
    NEWU_CLEAR_PASSWORDS,
    NEWU_CREATE_SUCCESS,
    NEWU_CREATE_USER,
    NEWU_CLEAR_SCREEN
} from '../actions/types';
import { Actions } from 'react-native-router-flux';

export const userDetailUpdate = ({ prop, value }) => {
    return (dispatch) => {

        if (prop === 'email') {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            dispatch({
                type: USER_DETAIL_UPDATE,
                payload: { prop: 'emailValid', value: re.test(value) }
            });
        }

        dispatch({
            type: USER_DETAIL_UPDATE,
            payload: { prop, value }
        });
    }
};

export const clearScreen = () => {
    Actions.pop();
    return {
        type: NEWU_CLEAR_SCREEN
    };
};

export const newUserIsEmailValid = (email, emailRepeat) => {
    return {

    };
}

export const createUser = ({ email, password, username }) => {
    return (dispatch) => {
        dispatch({ type: NEWU_CREATE_USER });
 
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            createUserSuccess(dispatch, username);
        })
        .catch(error => createUserFail(dispatch, error.code));
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

const createUserFail = (dispatch, errorCode) => {
    console.log(errorCode);
    var message = '';
    switch(errorCode) {
        case 'auth/email-already-in-use':
            message = 'Email already in use.';
            dispatch({
                type: NEWU_CLEAR_EMAILS
            });
            dispatch({
                type: NEWU_CLEAR_PASSWORDS
            });
            break;
        case 'auth/invalid-email':
            message =  'Invalid email.';           
            break;
        case 'auth/weak-password':
            message = 'Password is too weak. Must be at least 6 characters.';           
            dispatch({
                type: NEWU_CLEAR_PASSWORDS
            });
            break;
        default:
            message = 'Something went wrong';
            dispatch({
                type: NEWU_CLEAR_EMAILS
            });
            dispatch({
                type: NEWU_CLEAR_PASSWORDS
            });
            break;
    };

    Toast.show({
        text: message,
        textStyle: { color: "white" },
        buttonText: "Okay",
        duration: 5000
    });
};

const createUserSuccess = (dispatch, username) => {
    const { currentUser } = firebase.auth();
    
    currentUser.updateProfile({
        displayName: username
    })

    dispatch({
        type: NEWU_CREATE_SUCCESS,
        payload: currentUser
    });
    
    Actions.main({type:'reset'});
};
