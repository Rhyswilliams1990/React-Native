
import { PermissionsAndroid } from 'react-native';

import { LOCATION_ALLOWED } from './types';

export const queryLocationPermissions = () => {
    return (dispatch) => {
        try {        
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
                 }
            });
          } catch (err) {
            console.warn(err);
          }
    };   
};
