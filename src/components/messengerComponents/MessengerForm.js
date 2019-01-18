import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import { Header, Body, Text, Container } from 'native-base';

class MessengerForm extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.setState({
      messages: [
        {
          _id: currentUser.uid,
          text: `Hello Rhys, lots of love ${this.props.user.name}`,
          createdAt: new Date(),
          user: {
            _id: this.props.user.recipientUid,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
        <Container>
            <Header style={{ backgroundColor: 'white' }}>
                <Body>
                    <Text>
                        Floorplan
                    </Text>
                </Body>
            </Header>
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: firebase.auth().currentUser.uid
                }}
            />
        </Container>
    );
  }
}

export default MessengerForm;
