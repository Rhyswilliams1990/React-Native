import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Header, Body, Right, Left, Icon, Container, Title, Thumbnail } from 'native-base';

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
            avatar: this.props.user.uri,
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
            <Header>
                <Left style={{ flex: 0 }}>
                    <Icon onPress={() => Actions.pop()} name='arrow-back' />
                </Left>
                <Left style={{ paddingLeft: 15 }}>
                    <Thumbnail style={{ paddingLeft: 40 }} source={{ uri: this.props.user.uri }} />
                </Left>
                <Body style={{ flex: 2, paddingLeft: 15 }}>
                    <Title>{this.props.user.name}</Title>
                </Body>
                <Right style={{ flex: 0 }} />
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
