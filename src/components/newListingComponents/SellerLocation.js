import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Content, Container, Button, Text, Footer, FooterTab, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getNearbyAgents, setMapPropertyAddress } from '../../actions';

class SellerLocation extends Component {  
    state = {
        userLocation: null,
        watchId: null
    };

    componentDidMount() {
        this.setState({ userLocation: null });
        this.props.getNearbyAgents();
        if (this.props.userLocation) {
            this.setState({ 
                userLocation: 
                { 
                    latitude: this.props.userLocation.lat,
                    longitude: this.props.userLocation.lng
                } 
            });
        }
        this.getUserLocation();
    }

    componentWillUnmount() {
        // eslint-disable-next-line no-undef
        navigator.geolocation.clearWatch(this.state.watchId);
        this.props.unsubscribeNearby();
    }

    onContinuePress() {        
        Actions.addressForm();          
    } 

    onAgentPress(uid) {
        this[`markerref${uid}`].showCallout();
    }

    getUserLocation() {
        if (this.props.locationAllowed) {
            // eslint-disable-next-line no-undef
            const watchId = navigator.geolocation.watchPosition((location) => {
                this.setState({ userLocation: location.coords }); 
            });  
            this.setState({ watchId });
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
    renderButton() {               
        if (this.props.loadingAgents) {
            return (
            <Button disabled>
                <Spinner size='large' />
            </Button>);
        }

        return (
            <Button onPress={this.onContinuePress.bind(this)}>
                <Text>Continue</Text>
            </Button>);
    }
    render() {
        const { containerStyle } = styles;
        
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
                </Content>
                <Footer>
                    <FooterTab>
                        {this.renderButton()}
                    </FooterTab>
                </Footer>
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
    const { agents, loadingAgents, unsubscribeNearby } = state.newListing;
    const { locationAllowed } = state.globalSettings;
    return { agents, locationAllowed, loadingAgents, unsubscribeNearby };
};

export default connect(mapStateToProps, { getNearbyAgents, setMapPropertyAddress })(SellerLocation);
