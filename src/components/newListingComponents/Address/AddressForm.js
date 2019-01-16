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

class AddressForm extends Component {
  
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
              <Input placeholder="Address Line 1" />
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


export default AddressForm;
