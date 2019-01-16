import React, { Component } from 'react';
import { View, Text } from 'native-base';

class Confirmation extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text style={styles.textExclamation}>Congratulations</Text>
                <Text>Your agent will be in tough shortly.</Text>
                <Text>Thank you for choosing Local Link.</Text>      
                <View>
                    <Text>Flat 14 Ossel Court</Text>    
                    <Text>13 Telegraph Avenue</Text>    
                    <Text>Greenwich</Text>    
                    <Text>London</Text>    
                    <Text>SE10 1PO</Text>    
                </View>                  
                
                {/* TODO: ADD ADDRESS WHEN STATE IS WORKING */}
                {/* TODO: ADD AGENT CARD WHEN DESIGNED */}
            </View>  
        );
    }
}

const styles = {
    containerStyle: {        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textExclamation: {
        fontSize: 20,
        color: 'green'
    }
};

export default Confirmation;
