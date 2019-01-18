import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Input, Form, Item, Content, Container, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getNearbyAgents } from '../../actions';


class SellerLocation extends Component {  

    onContinuePress() {
        // TODO: Add animation over the map to as a 'loading', like a radar     
        if (this.props.agents.length > 0) {
            Actions.addressList();
        } else {
            this.props.getNearbyAgents();
        }        
    }

    onAgent1Press(uid) {
        this[`markerref${uid}`].showCallout();
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
                 onPress={this.onAgent1Press.bind(this, agent.uid)}  
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
    
    render() {
        const { containerStyle, mapStyle, buttonViewStyle } = styles;
        
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
                        <MapView
                            style={mapStyle}
                            region={this.props.user.coordinates}
                            showsUserLocation
                        >
                            <Marker                                     
                                coordinate={this.props.user.coordinates}                           
                            />                     
                        {this.renderAgentMarkers()}
                        </MapView>
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
    const { user, agents } = state.newListing;
    return { agents, user };
};

export default connect(mapStateToProps, { getNearbyAgents })(SellerLocation);
