import React, { Component } from 'react';
import { View, Text, Button, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

class Confirmation extends Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.containerStyle}>
                        <Text style={styles.textExclamation}>Congratulations {this.props.forename}</Text>
                        <Text>Your agent will be in tough shortly about your {this.props.numberOfBedrooms} bedroom {this.props.propertyType} property.</Text>
                        <Text>Thank you for choosing Local Link.</Text>      
                        <View style={{ paddingTop: 30 }}>
                            <Text>{this.props.address.street_number}</Text>    
                            <Text>{this.props.address.route}</Text>    
                            <Text>{this.props.address.locality}</Text>    
                            <Text>{this.props.address.country}</Text>    
                            <Text>{this.props.address.postal_code}</Text>    
                        </View>                  
                        {/* TODO: ADD AGENT CARD WHEN DESIGNED */}
                         
                    </View> 
                    <Button full onPress={() => { Actions.existingListing({ type: 'reset' }); }}>
                            <Text>Finish</Text>    
                        </Button> 
                </Content>
            </Container>
            
           
        );
    }
}

const styles = {
    containerStyle: {        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 60,
        alignItems: 'center'
    },
    textExclamation: {
        fontSize: 40,
        color: 'green',
        paddingBottom: 60,
        paddingTop: 60
    }
};

const mapStateToProps = state => {
    
    const {
        address,
        forename,
        numberOfBedrooms, 
        propertyType 
    } = state.newListing;
    return {
        address,
        forename,
        numberOfBedrooms,
        propertyType 
    };
};

export default connect(mapStateToProps)(Confirmation);
