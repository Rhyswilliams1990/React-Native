import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { 
    Title, 
    Left, 
    ListItem, 
    Body, 
    Container, 
    Header, 
    Right, 
    Icon, 
    Button, 
    Text,
    Thumbnail
} from 'native-base';
import { Actions } from 'react-native-router-flux';
//import { usersFetch } from '../actions';

class MessageList extends Component {
    constructor() {
        super();
        
        this.state = {
            data: [
                { name: 'Floor Plan', header: true },
                { recipientUid: '6v4hs34lSqQqApTXGMukO6sfQuu1', name: 'Gareth', title: 'Initial Appointment Created', uri: 'https://www.pdslibrary.org/sites/www.pdslibrary.org/files/Images/slp2018/hillbilly%20science.jpg', header: false },
                { recipientUid: 'RfcLNywcfNf867RcFCbzdwwGKTu1', name: 'Agent Smith', title: 'Referred by Gareth', uri: 'https://i.stack.imgur.com/mNaC3.jpg', header: false }
            ],
            stickyHeaderIndices: []
        };
    }

    componentWillMount() {
        const arr = [];
        this.state.data.forEach(obj => {
            if (obj.header) {
                arr.push(this.state.data.indexOf(obj));
            }
        });
        arr.push(0);
        this.setState({
            stickyHeaderIndices: arr
        });
    }

    renderItem = ({ item }) => {
        if (item.header) {
            return (
                <ListItem itemDivider>
                    <Body>
                        <Text style={{ fontWeight: 'bold' }}>
                            {item.name}
                        </Text>
                    </Body>
                </ListItem>
            );
        } else if (!item.header) {
            return (
                // <ListItem 
                //     style={{ marginLeft: 0 }}
                //     onPress={() => Actions.messengerForm({ user: item })}
                // >
                //     <Body>
                //         <Text>{item.name}</Text>
                //     </Body>
                // </ListItem>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={{ uri: item.uri }} />
                    </Left>
                    <Body>
                    <Text>{item.name}</Text>
                        <Text note numberOfLines={1}>{item.title}</Text>
                    </Body>
                    <Right>
                        <Button 
                            transparent
                            onPress={() => Actions.messengerForm({ user: item })}
                        >
                            <Text>View</Text>
                        </Button>
                    </Right>
                </ListItem>
            );
        }
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name='menu' />
                    </Left>
                    <Body>
                        <Title>Communications</Title>
                    </Body>
                    <Right>
                        <Button 
                            transparent
                            onPress={() => Actions.beginConversation()}
                        >
                            <Icon name='message-plus' type='MaterialCommunityIcons' />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.recipientUid || item.name}
                    stickyHeaderIndices={this.state.stickyHeaderIndices}
                />
            </Container>
        );
    }
}

export default MessageList;
