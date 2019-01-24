//import firebase from 'react-native-firebase';
import {
    MSG_NEW_COMM_UPD,
    MSG_CLEAR_COMM
} from '../actions/types';

export const newCommunicationUpdate = ({ prop, value }) => {
    return {
        type: MSG_NEW_COMM_UPD,
        payload: { prop, value }
    };
};

export const clearCommunicationScreen = () => {
    return {
        type: MSG_CLEAR_COMM
    };
};
