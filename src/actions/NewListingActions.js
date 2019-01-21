/* eslint-disable no-param-reassign */
import firebase from 'react-native-firebase';

import {
    NEARBY_AGENT_FETCH_SUCCESS,
    SET_MAP_LOOKUP_PROPERTY_ADDRESS,
    SET_PROPERTY_ADDRESS
} from './types';

const addressFields = 'street_number,route,locality,country,postal_code';

export const getNearbyAgents = () => {
    return (dispatch) => {
        try {
            firebase.firestore().collection('parties').where('type', '==', 'agent')
            .onSnapshot(snapshot => {
                console.log(snapshot);
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

export const setPropertyAddress = (street_number, address) => { 
    const formattedAddress = { ...transformAddressObject(address), street_number };   
    return { type: SET_PROPERTY_ADDRESS, payload: formattedAddress };
};

export const setMapPropertyAddress = (address) => {  
    const formattedAddress = transformAddressObject(address);  
    return { type: SET_MAP_LOOKUP_PROPERTY_ADDRESS, payload: formattedAddress };
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
