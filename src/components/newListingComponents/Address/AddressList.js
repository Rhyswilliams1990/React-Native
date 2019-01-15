import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, Header, Icon, Right, Title, Body } from 'native-base';
import AddressItem from './AddressItem';

class AddressList extends Component {
  state = {
    addresses: [
    {
      addressLine1: 'Flat 14 Ossel Court',
      addressLine2: '13 Telegraph Avenue',
      addressLine3: 'Greenwich',
      addressLine4: 'London',      
      postcode: 'SE10 1PO'
    },
    {
      addressLine1: 'Flat 15 Ossel Court',
      addressLine2: '13 Telegraph Avenue',
      addressLine3: 'Greenwich',
      addressLine4: 'London',      
      postcode: 'SE10 1PO'
    },
    {
      addressLine1: 'Flat 16 Ossel Court',
      addressLine2: '13 Telegraph Avenue',
      addressLine3: 'Greenwich',
      addressLine4: 'London',      
      postcode: 'SE10 1PO'
    },
    {
      addressLine1: 'Flat 17 Ossel Court',
      addressLine2: '13 Telegraph Avenue',
      addressLine3: 'Greenwich',
      addressLine4: 'London',      
      postcode: 'SE10 1PO'
    }
    ]
  };

  renderItem(address) {
    return <AddressItem address={address} />;        
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Select Address</Title>
          </Body>
          <Right>
            <Icon onPress={() => Actions.addressForm()} name='add' />
          </Right>
        </Header>
        <Content>
          <Card
            dataArray={this.state.addresses}
            renderRow={this.renderItem}           
          />
        </Content>
      </Container>
      
    );
  }
}

export default AddressList;
