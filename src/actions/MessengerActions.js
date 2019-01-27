import firebase from 'react-native-firebase';
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

export const getCommunications = () => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		try {
			const unsuscribe = firebase.firestore().collection('communications')
				.where('users', 'array-contains', currentUser.uid)
				.onSnapshot(snapshot => {
					passDataAndUnsuscribeFunction(dispatch, transformSnapshot(snapshot), unsuscribe);
				}, err => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};
};

const passDataAndUnsuscribeFunction = (dispatch, snapshot, unsuscribe) => {
	dispatch({
		type: MSG_NEW_COMM_UPD,
		payload: { prop: 'communications', value: snapshot }			
	});

	dispatch({
		type: MSG_NEW_COMM_UPD,
		payload: { prop: 'unsuscribeCommunicationList', value: unsuscribe }			
	});
};

const transformSnapshot = (snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {                   
        data.push({ ...doc.data(), uid: doc.id });
    });
    return data;    
};

