
import React, { Component } from 'react';
import { 
    Container, 
    Content, 
    Item, 
    Form, 
    Input, 
    Icon,
    Button, 
    Text,
    Picker, 
    Header, 
    Body, 
    Title,
    Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

class PropertyDetails extends Component {
    render() {
        return (
            <Container>
                 <Header>
                    <Left>
                        <Icon onPress={() => Actions.pop()} name='arrow-back' />
                    </Left>
                    <Body>
                        <Title>Property Details</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>

                        <Item>
                            <Icon 
                                active 
                                name='city'
                                type="FontAwesome5" 
                            />
                            <Picker placeholder='Property Type'>
                                <Item label='Detacted' value='detached' />
                                <Item label='Linked Detached' value='link_detached' />
                                <Item label='Semi Detached' value='semi_detached' />
                                <Item label='Terrace' value='terraced' />
                                <Item label='Flat' value='flat' />
                                <Item label='End Terrace' value='end_terrace' />
                                <Item label='Maisonette' value='maisonette' />
                                <Item label='Mews' value='mews' />
                                <Item label='Town House' value='town_house' />
                                <Item label='Cottage' value='cottage' />
                                <Item label='Bungalow' value='bungalow' />
                                <Item label='Barn' value='farm_barn' />
                                <Item label='Park' value='park_home' />
                            </Picker>
                        </Item>
                        <Item>
                            <Icon name='ra' type="FontAwesome" />
                            <Picker>
                                <Item label='Leasehold' value='freehold' />
                                <Item label='Freehold' value='leasehold' />
                                <Item 
                                    label='Share of Freehold' 
                                    value='share_of_freehold' 
                                />                                
                            </Picker>
                        </Item>
                        <Item>
                            <Icon name="bed" type="FontAwesome" />
                            <Input keyboardType="numeric" placeholder='Bedrooms' />
                        </Item>
                        <Item>
                            <Icon name='bath' type="FontAwesome" />
                            <Input keyboardType="numeric" placeholder='Bathrooms' />
                        </Item>
                        <Item>
                            <Icon name='sofa' type="MaterialCommunityIcons" />
                            <Input keyboardType="numeric" placeholder='Reception Rooms' />
                        </Item>
                    </Form>                    
                    <Button full onPress={() => { Actions.evaluation(); }}>
                        <Text>Continue</Text>
                    </Button>    
                </Content>
            </Container>
        );
    }
}

export default PropertyDetails;
