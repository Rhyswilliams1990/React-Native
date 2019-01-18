import firebase from 'react-native-firebase';

import {
    NEARBY_AGENT_FETCH_SUCCESS
} from './types';

export const getNearbyAgents = () => {
    return (dispatch) => {
        try {
            firebase.firestore().collection('parties').where('type', '==', 'agent')
            .onSnapshot(snapshot => {
                // eslint-disable-next-line no-underscore-dangle
                if (!snapshot._metadata.hasPendingWrites) {
                    transformSnapshot(dispatch, snapshot);
                }
            });
        } catch (err) {
            console.log(err);
        }         
    };
};

const transformSnapshot = (dispatch, snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {                   
        data.push({ ...doc.data(), uid: doc.id });
    });
    dispatch({ type: NEARBY_AGENT_FETCH_SUCCESS, payload: data });    
};
