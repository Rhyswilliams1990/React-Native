import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text, Button, Container, Content, Body, CardItem, Left, Icon, Right, Thumbnail, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const image = require('../../../assets/images/congrats.jpg');
const thumbnail = require('../../../assets/images/housethumb.jpg');

class Evaluation extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={thumbnail} large />
                        </Left>
                            <Body>
                                <Text>{this.props.address.street_number} {this.props.address.route}</Text>                                
                                <Text>{this.props.address.locality}</Text>
                                <Text>{this.props.address.country}</Text>
                                <Text>{this.props.address.postal_code}</Text>
                            </Body>
                        <Right>  
                            <View style={{ flexDirection: 'row', padding: 2 }}>
                                <Icon name='sofa' type='MaterialCommunityIcons' />
                                <Text style={{ paddingLeft: 5, alignContent: 'flex-end' }}>1</Text>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 2 }}>
                                <Icon name='bath' type='FontAwesome' />
                                <Text style={{ paddingLeft: 5 }}>1</Text>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 2 }}>
                                <Icon name='bed' type='FontAwesome' />
                                <Text style={{ paddingLeft: 5 }}>1</Text>
                            </View>                      
                        </Right>
                    </CardItem>
                    <CardItem bordered cardBody>
                        <Image source={image} style={styles.imageStyle} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <View style={styles.centerTextContainer}>
                                <Text style={styles.textExclamation}>{this.props.evaluation}</Text>
                                <Text style={styles.smallPrint}>*this is an estimate, a real estimate will be performed by a trained professional</Text>
                            </View>
                        </Body>                        
                    </CardItem>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => { Actions.userInfo(); }}>
                            <Text>Continue</Text>    
                        </Button> 
                    </FooterTab>
                </Footer>                
            </Container> 
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    smallPrint: {
        fontSize: 10,
        textAlign: 'center'
    },
    centerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: 300, 
        width: null, 
        flex: 1
    }
};

const mapStateToProps = state => {
    const { evaluation, address } = state.newListing;
    return { evaluation, address };
};

export default connect(mapStateToProps)(Evaluation);
