import React, { Component } from 'react';
import { Text, CardItem, Icon, Right } from 'native-base';

class AddressItem extends Component {
  render() {
    const { address, postcode } = this.props;
    
    const displayAddress = address.replace(',', '').replace('  ', ' ');
    const { textStyle } = styles;
    return (
      <CardItem bordered onPress={() => this.props.selectAddress(address, postcode)}>
          <Text style={textStyle}>{displayAddress}</Text>
          <Text style={textStyle}>{postcode}</Text>
          <Right>
            <Icon onPress={() => this.props.selectAddress(address, postcode)} name="arrow-forward" />
          </Right>
      </CardItem>
    );
  }
}

const styles = {
  textStyle: {
    padding: 2,
    fontSize: 10
  }
};

export default AddressItem;
