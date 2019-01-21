/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, 
  Content, 
  Card, 
  Header, 
  Icon, 
  Right, 
  Title, 
  Body, 
  Left, 
  Input, Form, Item } from 'native-base';
import AddressItem from './AddressItem';
import { setPropertyAddress } from '../../../actions/NewListingActions';

class AddressList extends Component {
  state = {
    addresses: [],
    postcode: '',
    number: ''
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
      this.postcodeLookup(postal_code, street_number);
    }
  } 
  
  async postcodeLookup(postcode, streetNo) {    
    try {
      this.setState({ postcode: postcode.toUpperCase() });
      const url = `https://api.getAddress.io/find/${postcode}/${streetNo}?api-key=N-pvuAwJAkqsm2_Q4Op7CA17017`;
      
      const response = await fetch(url);
      if (response.ok) {
        const responseJson = await response.json();
        this.setState({ addresses: responseJson.addresses });  
      } else {
        console.log(response);
      }          
    } catch (err) {
      console.log(err);
    }
  }

  selectAddress(address, postcode) {
    this.setPropertyAddress(address + postcode);
    Actions.propertyDetails();
  }

  renderItem(address) {
    return <AddressItem address={address} postcode={this.state.postcode} />;        
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
              <Icon onPress={() => Actions.pop()} name='arrow-back' />
          </Left>
          <Body>
            <Title>Address Lookup</Title>
          </Body>
          <Right>
            <Icon onPress={() => Actions.addressForm()} name='add' />
          </Right>
        </Header>
        <Content>
          <Form>
              <Item>
                <Input                       
                      placeholder="Number"                        
                      onChangeText={(text) => {                        
                        this.setState({ number: text });
                      }}
                      value={this.state.number}
                />  
                <Input                       
                    placeholder="Postcode"                        
                    onChangeText={(text) => {                        
                      this.setState({ postcode: text });
                    }}
                    value={this.state.postcode}
                />    
                <Icon action name='search' onPress={() => this.postcodeLookup(this.state.postcode, this.state.number ? this.state.number : '')} />
              </Item>
            <Card
              dataArray={this.state.addresses}
              renderRow={this.renderItem.bind(this)}           
            />
          </Form>
        </Content>
      </Container>
      
    );
  }
}

const mapStateToProps = state => {
  const { mapLookupAddress } = state.newListing;
  return { mapLookupAddress };
};

export default connect(mapStateToProps, { setPropertyAddress })(AddressList);
