import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Input, Form, Item, Content, Container, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getNearbyAgents } from '../../actions';

class SellerLocation extends Component {  
    state = {
        userLocation: null
    };
   
    componentDidMount() {
       this.requestLocationPermission();
    }

    onContinuePress() {        
        // TODO: Add animation over the map to as a 'loading', like a radar     
        if (this.props.agents.length > 0) {
            Actions.addressList();
        } else {
            this.props.getNearbyAgents();
        }        
    }   

    onAgentPress(uid) {
        this[`markerref${uid}`].showCallout();
    }

    async requestLocationPermission() {
        try {        
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Help us find your location',
              message: 'We need to access location services  ' +
                         'so we can find nearby agents.'
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // eslint-disable-next-line no-undef
                navigator.geolocation.watchPosition((location) => {
                    this.setState({ userLocation: location.coords });                    
            });
          }         
        } catch (err) {
          console.warn(err);
        }
    }

    renderAgentMarkers() {
       /* TODO: Use something like:
       import { Icon as rnIcon } from 'react-native-vector-icons';
       rnIcon.getImageSource('person-pin', 20, 'blue')
       to get person icon instead of default */ 
        
       if (this.props.agents.length > 0) {      
        const markers = [];

        this.props.agents.forEach((agent) => {
         markers.push(
             <Marker  
                 key={agent.uid}
                 pinColor='blue'
                 coordinate={{ 
                        latitude: agent.coordinates.latitude, 
                        longitude: agent.coordinates.longitude 
                    }}                
                 onPress={this.onAgentPress.bind(this, agent.uid)}  
                 title={`${agent.name.firstName} ${agent.name.surname}`} 
                 description={agent.shortDescription}
                 ref={marker => {
                     this[`markerref${agent.uid}`] = marker;
                 }}        
             />
         );
        });   
        return (
            <View>
               { markers }                
            </View>
        );
       }       
    }
    
    renderMapView() {
        const { mapStyle } = styles;
        if (this.state.userLocation) {
            return (
                <MapView
                    style={mapStyle}
                    region={{ 
                        latitude: this.state.userLocation.latitude, 
                        longitude: this.state.userLocation.longitude,
                        latitudeDelta: 0.0822,
                        longitudeDelta: 0.0421 
                    }} 
                    showsUserLocation
                >
                    {/* <Marker                                     
                        coordinate={{ 
                            latitude: this.state.userLocation.latitude, 
                            longitude: this.state.userLocation.longitude 
                        }}                           
                    />   */}
                 {this.renderAgentMarkers()}
                </MapView>   
            ); 
        }
        return (
            <MapView
                style={mapStyle} 
                showsUserLocation
            />                        
        );        
    }
    
    render() {
        const { containerStyle, buttonViewStyle } = styles;
        
        return (
            <Container>
                <Content >
                    <Form>
                        <Item>
                            <Input 
                                placeholder="PostCode"                        
                            />    
                            <Icon action name='search' />
                        </Item>
                    </Form>
                    <View style={containerStyle}>
                        { this.renderMapView()}       
                    </View>
                    <View style={buttonViewStyle}>
                        <Button onPress={this.onContinuePress.bind(this)}>
                            <Text>Continue</Text>
                        </Button>
                    </View>
                </Content>
            </Container>            
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      // TODO: I dont think this will be accurate
      height: height - 75,
      width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapStyle: {
      ...StyleSheet.absoluteFillObject,
    },
    buttonViewStyle: {
        position: 'absolute',
        top: '80%', 
        alignSelf: 'center'
    }
   });

const mapStateToProps = state => {
    const { agents } = state.newListing;
    return { agents };
};

export default connect(mapStateToProps, { getNearbyAgents })(SellerLocation);
