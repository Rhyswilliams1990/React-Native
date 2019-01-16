import React, { Component } from 'react';
import { Text, CardItem, Icon, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

class AddressItem extends Component {
  render() {
    const { addressLine1, addressLine2, addressLine3, addressLine4, postcode } = this.props.address;
    const { textStyle } = styles;
    return (
      <CardItem bordered onPress={() => Actions.propertyDetails()}>
          <Text style={textStyle}>{addressLine1}</Text>
          <Text style={textStyle}>{addressLine2}</Text>
          <Text style={textStyle}>{addressLine3}</Text>
          <Text style={textStyle}>{addressLine4}</Text>
          <Text style={textStyle}>{postcode}</Text>
          <Right>
            <Icon onPress={() => Actions.propertyDetails()} name="arrow-forward" />
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
