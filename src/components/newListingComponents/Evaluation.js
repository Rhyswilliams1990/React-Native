import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Confirmation extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>                           
                <Text>Based on recent sales in your area</Text>
                <Text>your property is worth:</Text>      
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textExclamation}>£400,000</Text>
                    <Text style={styles.smallPrint}>*this is an estimate, a real estimate will be performed by a trained professional</Text>
                </View>
                <View style={{ alignSelf: 'center', padding: 20 }}>
                    <Button full onPress={() => { Actions.confirmation(); }}>
                        <Text>Continue</Text>    
                    </Button> 
                </View>
                               
            </View>  
        );
    }
}

const styles = {
    containerStyle: {        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    textExclamation: {
        fontSize: 60,
        color: 'green',
        fontWeight: 'bold'
    },
    smallPrint: {
        fontSize: 10
    }
};

export default Confirmation;
