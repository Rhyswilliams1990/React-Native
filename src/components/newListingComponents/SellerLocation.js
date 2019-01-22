import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Content, Container, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getNearbyAgents, setMapPropertyAddress } from '../../actions';

class SellerLocation extends Component {  
    state = {
        userLocation: null
    };
   
    componentWillMount() {
        if (this.props.userLocation) {
            this.setState({ 
                userLocation: 
                { 
                    latitude: this.props.userLocation.lat,
                    longitude: this.props.userLocation.lng
                } 
            });
        }
    }

    componentDidMount() {
       this.getUserLocation();
    }

    onContinuePress() {        
        // TODO: Add animation over the map to as a 'loading', like a radar     
        if (this.props.agents.length > 0) {
            Actions.addressForm();
        } else {
            this.props.getNearbyAgents();
        }        
    }   

    onAgentPress(uid) {
        this[`markerref${uid}`].showCallout();
    }

    getUserLocation() {
        if (this.props.locationAllowed) {
            // eslint-disable-next-line no-undef
            navigator.geolocation.watchPosition((location) => {
                this.setState({ userLocation: location.coords }); 
            });  
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
                    <Marker                                     
                        coordinate={{ 
                            latitude: this.state.userLocation.latitude, 
                            longitude: this.state.userLocation.longitude 
                        }}                           
                    />  
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
                    <GooglePlacesAutocomplete
                        styles={searchStyles}
                        listViewDisplayed='false'  
                        placeholder='Search'
                        minLength={2} 
                        fetchDetails 
                        query={{
                            key: 'AIzaSyCoLf5U9Z3FKXzl1suWJQyLB1CrYlpddMs',
                            language: 'en'
                        }}
                        onPress={(data, details = null) => { 
                                if (details.address_components) {
                                    this.props.setMapPropertyAddress(details.address_components);
                                }                                
                                this.setState({ 
                                        userLocation: 
                                        { 
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng
                                        } 
                                    });
                            }}
                    />                   
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

const searchStyles = {
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
        margin: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0
  }
};

const mapStateToProps = state => {
    const { agents } = state.newListing;
    const { locationAllowed } = state.globalSettings;
    return { agents, locationAllowed };
};

export default connect(mapStateToProps, { getNearbyAgents, setMapPropertyAddress })(SellerLocation);
