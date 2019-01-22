/* eslint-disable no-param-reassign */
import firebase from 'react-native-firebase';

import {
    NEARBY_AGENT_FETCH_SUCCESS,
    SET_MAP_LOOKUP_PROPERTY_ADDRESS,
    SET_PROPERTY_ADDRESS,
    NEW_LISTING_UPDATE,
    UPDATE_ADDRESS_LINE
} from './types';
import { Actions } from 'react-native-router-flux';

const addressFields = 'street_number,route,locality,country,postal_code';

export const getNearbyAgents = () => {
    return (dispatch) => {
        try {
            firebase.auth().currentUser.getIdToken()
            .then(() => {
                firebase.firestore().collection('parties').where('type', '==', 'agent')            
                .onSnapshot(snapshot => {
                    // eslint-disable-next-line no-underscore-dangle                    
                    if (!snapshot._metadata.hasPendingWrites) {
                        transformSnapshot(dispatch, snapshot);
                    }
                }, err => console.log(err));
            }
            ).catch(err => console.log(err));            
        } catch (err) {
            console.log(err);
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
    dispatch({ type: NEARBY_AGENT_FETCH_SUCCESS, payload: data });    
};
