/* eslint-disable no-param-reassign */
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

import {
    NEARBY_AGENT_FETCH_SUCCESS,
    SET_MAP_LOOKUP_PROPERTY_ADDRESS,
    SET_PROPERTY_ADDRESS,
    NEW_LISTING_UPDATE,
    UPDATE_ADDRESS_LINE,
    FINISH_NEW_LISTING,
    FETCH_NEARBY_AGENT,
    NEARBY_AGENT_FETCH_FAILED,
    NEARBY_AGENT_FETCH_SNAPSHOT,
    SAVE_NEW_LISTING,
    SAVE_NEW_LISTING_FAIL,
    SAVE_NEW_LISTING_SUCCESS
} from './types';

const addressFields = 'street_number,route,locality,country,postal_code';

export const getNearbyAgents = () => {
    return (dispatch) => {
        try {
            dispatch({ type: FETCH_NEARBY_AGENT });
            firebase.auth().currentUser.getIdToken()
            .then(() => {
                const unsubscribe = firebase.firestore().collection('parties').where('type', '==', 'agent')            
                    .onSnapshot(snapshot => {
                        // eslint-disable-next-line no-underscore-dangle                    
                        if (!snapshot._metadata.hasPendingWrites) {
                            const data = transformSnapshot(dispatch, snapshot);
                            dispatch({ type: NEARBY_AGENT_FETCH_SUCCESS, payload: data });    
                        }
                    }, err => onFetchNearbyAgentFailed(err, dispatch));
                dispatch({ type: NEARBY_AGENT_FETCH_SNAPSHOT, payload: unsubscribe });    
            }
            ).catch(err => onFetchNearbyAgentFailed(err, dispatch));            
        } catch (err) {
            onFetchNearbyAgentFailed(err, dispatch);
        }         
    };
};

const onFetchNearbyAgentFailed = (err, dispatch) => {
    dispatch({ type: NEARBY_AGENT_FETCH_FAILED });  
    console.log(err);
};

export const finishNewListing = () => {
    return { type: FINISH_NEW_LISTING };
};

export const saveNewListing = (instruction) => {
    return (dispatch) => {
        try {
            dispatch({ type: SAVE_NEW_LISTING });
            firebase.auth().currentUser.getIdToken()
                .then(() => {
                    firebase.firestore().collection('instructions')
                    .add(instruction)
                    .then(() => {
                        dispatch({ type: SAVE_NEW_LISTING_SUCCESS });
                        Actions.confirmation(); 
                    });
                });
        } catch (err) {
            dispatch({ type: SAVE_NEW_LISTING_FAIL });
        }        
    };
};

export const setPropertyLine = (addressLine) => {
    return { type: UPDATE_ADDRESS_LINE, payload: addressLine };
};

export const setPropertyAddress = (street_number, address) => { 
    const formattedAddress = { ...transformAddressObject(address), street_number };   
    return { type: SET_PROPERTY_ADDRESS, payload: formattedAddress };
};

export const setMapPropertyAddress = (address) => {  
    const formattedAddress = transformAddressObject(address);  
    return { type: SET_MAP_LOOKUP_PROPERTY_ADDRESS, payload: formattedAddress };
};

export const onNewListingChange = (change) => {
    return { type: NEW_LISTING_UPDATE, payload: change };
};

export const getEvaluation = () => {
    return (dispatch) => {
        dispatch({ type: NEW_LISTING_UPDATE, payload: { prop: 'evaluation', value: 400000 } });
        Actions.evaluation();
    };
};

const transformAddressObject = (address) => {
    return address.reduce((obj, addressLine) => {
        addressLine.types.forEach(type => {
            if (addressFields.includes(type)) {
                obj[type] = addressLine.long_name;
            }
        });
        return obj;
    }, {});
};

const transformSnapshot = (dispatch, snapshot) => {
    const data = [];
    snapshot.forEach((doc) => {                   
        data.push({ ...doc.data(), uid: doc.id });
    });
    return data;    
};
