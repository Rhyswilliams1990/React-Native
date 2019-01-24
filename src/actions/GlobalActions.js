
import { PermissionsAndroid } from 'react-native';

import { LOCATION_ALLOWED, QUERY_LOCATION_PERMISSION } from './types';

export const queryLocationPermissions = () => {
    return (dispatch) => {
        try {        
            dispatch({ type: QUERY_LOCATION_PERMISSION });
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Help us find your location',
                message: 'We need to access location services  ' +
                           'so we can find nearby agents.'
              }
            ).then(value => {
                if (value === PermissionsAndroid.RESULTS.GRANTED) {
                    dispatch({ type: LOCATION_ALLOWED, payload: true });
                 } else {
                    dispatch({ type: LOCATION_ALLOWED, payload: false });
                 }
            });
          } catch (err) {
            console.warn(err);
          }
    };   
};
