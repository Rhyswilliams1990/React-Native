import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast, Root, Container, Content, Header, Button, Form, Item, Input, Right, Text, Icon, Left, Body, Col, Grid, Title, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { queryLocationPermissions } from '../../actions';
import { setPropertyAddress } from '../../actions/NewListingActions';


class FindLocation extends Component {
    state={
        number: '',
        postcode: '',
        loading: false
    }
   
    componentDidUpdate() {
        if (this.props.locationAllowed) {
            Actions.sellerLocation();
        }
    }

    async postcodeLookup(postcode, streetNo) {    
        try {
            this.loading = true;
            const pc = postcode.toUpperCase(); 
            this.setState({ postcode: pc });
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${streetNo},${postcode}&sensor=false&key=AIzaSyCoLf5U9Z3FKXzl1suWJQyLB1CrYlpddMs`;
            
            // eslint-disable-next-line no-undef
            const response = await fetch(url);
            if (response.ok) {
                const responseJson = await response.json(); 
                if (responseJson.results.length > 0) {
                    this.loading = false;
                    this.props.setPropertyAddress(streetNo, responseJson.results[0].address_components);
                    Actions.sellerLocation({ userLocation: responseJson.results[0].geometry.location }); 
                } else {
                    this.loading = false;
                    Toast.show({
                        text: 'Could not find address!',
                        textStyle: { color: 'white' },
                        buttonText: 'Okay',
                        duration: 5000
                    });
                }                         
            } else {
                this.loading = false;
                console.log(response);
            }          
        } catch (err) {
            this.loading = false;
            console.log(err);
        }
    }

    useLocationButton() {        
        this.props.queryLocationPermissions();  
    }
    postcodeButtonPressed() {
        const { number, postcode } = this.state;
        if (number === '' || postcode === '') {
            Toast.show({
                text: 'Number and postcode required',
                textStyle: { color: 'white' },
                buttonText: 'Okay',
                duration: 5000
            });
        } else {
            this.postcodeLookup(postcode, number);
        } 
    }
    renderButton() {
        if (this.loading) {
            return (
                <Button disabled full>
                    <Text>Lookup Postcode</Text>
                    <Right>
                        <Spinner style={{ paddingRight: 3 }} size='small' />
                    </Right>
                </Button>
            );
        }
        return (
            <Button full onPress={this.postcodeButtonPressed.bind(this)}>
                <Text>Lookup Postcode</Text>
                <Right>
                    <Icon name='search' />
                </Right>
            </Button>
        );
    }
    render() {
        return (
            <Root>
            <Container>
                <Header>
                    <Left>
                        <Icon onPress={() => Actions.pop()} name='arrow-back' />
                    </Left>
                    <Body>
                        <Title>Find Address</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item>
                            <Input                       
                                placeholder="Number"                        
                                onChangeText={(text) => {                        
                                    this.setState({ number: text });
                                }}
                                value={this.state.number}
                            />                                  
                        </Item>
                        <Item>
                            <Input                       
                                placeholder="Postcode"                        
                                onChangeText={(text) => {                        
                                this.setState({ postcode: text });
                                }}
                                value={this.state.postcode}
                            />
                        </Item>    
                    </Form> 
                    <Grid>
                        <Col style={{ paddingRight: 10 }}>
                            <Button light full onPress={this.useLocationButton.bind(this)}>
                                <Text>Use Location</Text>
                                <Right>
                                    <Icon name='location-searching' type='MaterialIcons' />
                                </Right>
                            </Button>
                        </Col> 
                        <Col style={{ paddingLeft: 10 }}>
                            {this.renderButton()}
                           
                        </Col>
                    </Grid>
                </Content>
            </Container>
            </Root>
        );
    }
}

const mapStateToProps = state => {
    const { locationAllowed } = state.globalSettings;
    return { locationAllowed };
};


export default connect(mapStateToProps, { queryLocationPermissions, setPropertyAddress })(FindLocation);
