import React, { Component } from 'react';
import { View, Text, Button, Content, Container, CardItem, Body, Icon, Card, Item, Left, Thumbnail,Right, Label, Footer, FooterTab } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { finishNewListing } from '../../actions';

const thumbnail = require('../../../assets/images/garethavatar.jpeg');
const image = require('../../../assets/images/congrats.jpg');

class Confirmation extends Component {
    finishNewListing() {  
        this.props.finishNewListing();                       
        Actions.existingListing({ type: 'reset' }); 
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <CardItem bordered>
                        <Left>
                        <Thumbnail source={thumbnail} />
                            <Body>
                                <Text>David Bloggs</Text>
                                <Text note>+44 330 123456</Text>
                            </Body>
                        </Left>
                        <Right>
                            <View style={{ flexDirection: 'row' }}><Icon style={{ color: 'gold' }} name='star'/><Icon style={{ color: 'gold' }} name='star'/><Icon style={{ color: 'gold' }} name='star'/><Icon style={{ color: 'gold' }} name='star'/><Icon style={{ color: 'gold' }} name='star'/></View>
                            <Item>
                                <Label>55</Label>
                                <Icon name='exchange' type='FontAwesome' />
                            </Item>
                            
                        </Right>
                    </CardItem>
                    <CardItem bordered cardBody>
                        <Image source={image} style={{height: 300, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Text style={{ fontSize: 12, textAlign: 'center' }} >Your agent will be in tough shortly about your {this.props.numberOfBedrooms} bedroom {this.props.propertyType} property.</Text>   
                    </CardItem>                   
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.finishNewListing.bind(this)}>
                            <Text>Finish</Text>    
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
        paddingBottom: 60,
        alignItems: 'center'
    },
    textExclamation: {
        fontSize: 30,
        color: 'green'
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

export default connect(mapStateToProps, { finishNewListing })(Confirmation);
