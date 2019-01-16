import React, { Component } from 'react';
import { Text, CardItem, Icon, Right } from 'native-base';

class AddressItem extends Component {
  render() {
    const { addressLine1, addressLine2, addressLine3, addressLine4, postcode } = this.props.address;
    const { textStyle } = styles;
    return (
      <CardItem bordered>
          <Text style={textStyle}>{addressLine1}</Text>
          <Text style={textStyle}>{addressLine2}</Text>
          <Text style={textStyle}>{addressLine3}</Text>
          <Text style={textStyle}>{addressLine4}</Text>
          <Text style={textStyle}>{postcode}</Text>
          <Right>
            <Icon name="arrow-forward" />
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
