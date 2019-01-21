import React, { Component } from 'react';
import { 
  Container, 
  Text, 
  Content, 
  Form, 
  Item, 
  Input, 
  Textarea, 
  Button, 
  Header, 
  Left, 
  Icon, 
  Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setPropertyAddress } from '../../../actions/NewListingActions';

class AddressForm extends Component {
  state = {
    street_number: '',
    route: '',
    locality: '',
    country: '',
    postal_code: ''
  };

  componentWillMount() {
    if (!this.props.mapLookupAddress) {
      return;
    }
    const { postal_code, street_number } = this.props.mapLookupAddress;
    if (street_number) {
      this.setState({ number: street_number.toUpperCase() });
    }
    
    if (postal_code) {
      this.setState({ postcode: postal_code.toUpperCase() });
    }
  } 

  render() {
  console.log('render hit');
    return (
      <Container>
        <Header>
          <Left>
            <Icon onPress={() => Actions.pop()} name='arrow-back' />
          </Left>
          <Body>
            <Text>Edit Address</Text>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Number" />
            </Item>
            <Item>
              <Input placeholder="Address Line 2" />
            </Item>
            <Item>
              <Input placeholder="Address Line 3" />
            </Item>
            <Item>
              <Input placeholder="Address Line 4" />
            </Item>
            <Item>
              <Input placeholder="PostCode" />
            </Item>
            <Item last>
              <Textarea rowSpan={5} placeholder="Additional Directions" />
            </Item>            
          </Form>   
          <Button full><Text>Save</Text></Button>        
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  const { mapLookupAddress } = state.newListing;
  return { mapLookupAddress };
};

export default connect(mapStateToProps, { setPropertyAddress })(AddressForm);
