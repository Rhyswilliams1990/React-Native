import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
// import { Icon as rnIcon } from 'react-native-vector-icons';

import { Input, Form, Item, Content, Container, Icon, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';


class SellerLocation extends Component {
    state= {
        coordinate: {
            latitude: 51.516737, 
            longitude: -0.100200,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        showAgents: false,
        agents: {
            agent1: {
                name: 'Gareth Williams',
                description: 'Ut ridens graecis interpretaris mea.',
                coordinate: {
                    latitude: 51.542237, 
                    longitude: -0.082200,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            },
            agent2: {
                name: 'Lucia Carne',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
                coordinate: {
                    latitude: 51.536237, 
                    longitude: -0.110200,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            },
            agent3: {
                coordinate: {
                    latitude: 51.526237, 
                    longitude: -0.120200,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
            }
        }   
    };

    onAgent1Press() {
        this.marker1.showCallout();
    }

    onAgent2Press() {
        this.marker2.showCallout();
    }

    onContinuePress() {
        // TODO: Add animation over the map to as a 'loading', like a radar        
         
        if (this.state.showAgents) {
            Actions.addressList();
        } else {
            this.setState({ showAgents: true });
        }        
    }

    renderAgentMarkers() {
       if (this.state.showAgents) {
        return (
            <View>
                {/* TODO: Use rnIcon.getImageSource('person-pin', 20, 'blue') to get person icon instead of default */}
                <Marker  
                    pinColor='blue'
                    coordinate={this.state.agents.agent1.coordinate}                
                    onPress={this.onAgent1Press.bind(this)}  
                    title={this.state.agents.agent1.name} 
                    description={this.state.agents.agent1.description}
                    ref={marker => {
                        this.marker1 = marker;
                      }}        
                />
                <Marker    
                    pinColor='blue'                                 
                    coordinate={this.state.agents.agent2.coordinate}                
                    onPress={this.onAgent2Press.bind(this)} 
                    ref={marker => {
                        this.marker2 = marker;
                      }}                 
                >
                 <Callout>
                    <View style={{ height: 150, width: 250 }}>
                        
                        <Text>
                            {this.state.agents.agent2.name}
                        </Text>
                        <Text>
                            {this.state.agents.agent2.description}
                        </Text>
                    </View>
                </Callout>
                </Marker>
                <Marker         
                    pinColor='blue'                            
                    coordinate={this.state.agents.agent3.coordinate}                
                    onPress={this.onAgent1Press.bind(this)}
                    ref={marker => {
                        this.marker3 = marker;
                      }}                  
                />      
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
                                region={{
                                    latitude: 51.516737, 
                                    longitude: -0.100200,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                showsUserLocation
                            >
                            <Marker                                     
                                coordinate={this.state.coordinate}
                                onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}                                
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

export default SellerLocation;
