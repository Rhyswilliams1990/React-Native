
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    Left, 
    FooterTab,
    Footer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { onNewListingChange, getEvaluation } from '../../actions';

const PROPERTY_FIELD = 'propertyType';
const OWNERSHIP_FIELD = 'ownershipType';
const BEDROOMS_FIELD = 'numberOfBedrooms';
const BATHROOMS_FIELD = 'numberOfBathrooms';
const RECEPTION_ROOMS_FIELD = 'numberOfReceptionRooms';

class PropertyDetails extends Component {
    onPropertyTypeChange(value) {
        this.props.onNewListingChange({ prop: PROPERTY_FIELD, value });
    }

    onOwnershipTypeChange(value) {
        this.props.onNewListingChange({ prop: OWNERSHIP_FIELD, value });
    }
    
    onBedroomsChange(value) {
        this.props.onNewListingChange({ prop: BEDROOMS_FIELD, value });
    }
    
    onBathroomsChange(value) {
        this.props.onNewListingChange({ prop: BATHROOMS_FIELD, value });
    }
    
    onReceptionRoomsChange(value) {
        this.props.onNewListingChange({ prop: RECEPTION_ROOMS_FIELD, value });
    }
    
    onContinuePress() {
        this.props.getEvaluation();        
    }

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
                            <Picker                             
                                onValueChange={this.onPropertyTypeChange.bind(this)} 
                                selectedValue={this.props.propertyType}
                                placeholder='Property Type'
                            >
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
                            <Picker 
                                onValueChange={this.onOwnershipTypeChange.bind(this)} 
                                selectedValue={this.props.ownershipType}
                            >
                                <Item label='Leasehold' value='leasehold' />
                                <Item label='Freehold' value='freehold' />
                                <Item 
                                    label='Share of Freehold' 
                                    value='share_of_freehold' 
                                />                                
                            </Picker>
                        </Item>
                        <Item>
                            <Icon name="bed" type="FontAwesome" />
                            <Input 
                                onChangeText={this.onBedroomsChange.bind(this)} 
                                value={this.props.numberOfBedrooms}
                                keyboardType="numeric" 
                                placeholder='Bedrooms' 
                            />
                        </Item>
                        <Item>
                            <Icon name='bath' type="FontAwesome" />
                            <Input 
                                onChangeText={this.onBathroomsChange.bind(this)} 
                                value={this.props.numberOfBathrooms}
                                keyboardType="numeric" 
                                placeholder='Bathrooms' 
                            />
                        </Item>
                        <Item>
                            <Icon name='sofa' type="MaterialCommunityIcons" />
                            <Input 
                                onChangeText={this.onReceptionRoomsChange.bind(this)} 
                                value={this.props.numberOfReceptionRooms}
                                keyboardType="numeric" 
                                placeholder='Reception Rooms' 
                            />
                        </Item>
                    </Form>    
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={this.onContinuePress.bind(this)}>
                            <Text>Continue</Text>
                        </Button>  
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { 
        numberOfReceptionRooms, 
        numberOfBathrooms, 
        numberOfBedrooms, 
        ownershipType, 
        propertyType 
    } = state.newListing;

    return { numberOfReceptionRooms, 
        numberOfBathrooms, 
        numberOfBedrooms, 
        ownershipType, 
        propertyType };
};

export default connect(mapStateToProps, { onNewListingChange, getEvaluation })(PropertyDetails);
