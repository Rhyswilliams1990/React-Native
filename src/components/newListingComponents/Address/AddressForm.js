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
import { setPropertyLine } from '../../../actions/NewListingActions';

const STREET_FIELD = 'street_number';
const ROUTE_FIELD = 'route';
const LOCALITY_FIELD = 'locality';
const COUNTRY_FIELD = 'country';
const POSTCODE_FIELD = 'postcode';

class AddressForm extends Component {
  
  onValueChange(prop, value) {
      this.props.setPropertyLine({ prop, value });
  }
  onContinuePress() {
    Actions.propertyDetails();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Icon onPress={() => Actions.pop()} name='arrow-back' />
          </Left>
          <Body>
            <Text>Confirm Address</Text>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input 
                onChangeText={this.onValueChange.bind(this, STREET_FIELD)}
                value={this.props.street_number} 
                placeholder="Number" 
              />
            </Item>
            <Item>
              <Input 
                onChangeText={this.onValueChange.bind(this, ROUTE_FIELD)}
                placeholder="Address Line 2" 
                value={this.props.route} 
              />
            </Item>
            <Item>
              <Input 
                onChangeText={this.onValueChange.bind(this, LOCALITY_FIELD)}
                placeholder="Address Line 3" 
                value={this.props.locality} 
              />
            </Item>
            <Item>
              <Input 
                onChangeText={this.onValueChange.bind(this, COUNTRY_FIELD)}
                placeholder="Address Line 4" 
                value={this.props.country} 
              />
            </Item>
            <Item>
              <Input               
                onChangeText={this.onValueChange.bind(this, POSTCODE_FIELD)}
                placeholder="PostCode"        
                value={this.props.postal_code}        
              />
            </Item>
            <Item last>
              <Textarea rowSpan={5} placeholder="Additional Directions" />
            </Item>            
          </Form>   
          <Button full><Text onPress={this.onContinuePress.bind(this)}>Continue</Text></Button>        
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  const { street_number, route, locality, country, postal_code } = state.newListing.address;
  return { street_number, route, locality, country, postal_code };
};

export default connect(mapStateToProps, { setPropertyLine })(AddressForm);
