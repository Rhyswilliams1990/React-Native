import React, { Component } from 'react';
import { View, Text, Button, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Confirmation extends Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.containerStyle}>
                        <Text style={styles.textExclamation}>Congratulations</Text>
                        <Text>Your agent will be in tough shortly.</Text>
                        <Text>Thank you for choosing Local Link.</Text>      
                        <View style={{ paddingTop: 30 }}>
                            <Text>Flat 14 Ossel Court</Text>    
                            <Text>13 Telegraph Avenue</Text>    
                            <Text>Greenwich</Text>    
                            <Text>London</Text>    
                            <Text>SE10 1PO</Text>    
                        </View>                  
                        
                        {/* TODO: ADD ADDRESS WHEN STATE IS WORKING */}
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

export default Confirmation;
