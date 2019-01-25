import React, { Component } from 'react';
import { Container, Text, Header, Title, Body, Left, Right, Icon } from 'native-base';

class HomeForm extends Component {
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left />
                    <Body>
                        <Title style={{ color: '#27bfb3' }}>Your Properties</Title>
                    </Body>
                    <Right>
                        <Icon name='add' style={{ color: '#27bfb3' }}></Icon>
                    </Right>
                </Header>
            </Container>
        );
    }
}

export default HomeForm;
