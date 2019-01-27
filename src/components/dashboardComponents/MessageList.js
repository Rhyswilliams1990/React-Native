import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
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
import firebase from 'react-native-firebase';
import { getCommunications } from '../../actions';

class MessageList extends Component {
	constructor() {
		super();
		this.state = {
			loggedUser: firebase.auth().currentUser.uid
		};
	}

	componentDidMount() {
		if (this.props.unsuscribeCommunicationList === null) {
			this.props.getCommunications();
		}
	}

	componentWillUnmount() {
		this.props.unsuscribeCommunicationList();
	}

	targetOrSourceAvatar = (owner) => {
		if (owner === this.state.loggedUser) {
			return 'targetAvatar';
		} 
		return 'ownerAvatar';	
	}

	targetOrSourceName = (owner) => {
		if (owner === this.state.loggedUser) {
			return 'targetName';
		} 
		return 'ownerName';	
	}

    renderItem = ({ item }) => {
		const owner = item.owner;
		return (
			<ListItem thumbnail>
				<Left>
					<Thumbnail source={{ uri: item[this.targetOrSourceAvatar(owner)] }} />
				</Left>
				<Body>
					<Text>{item[this.targetOrSourceName(owner)]}</Text>
					<Text note numberOfLines={1}>{item.category} - {item.title}</Text>
				</Body>
				<Right>
					<Button 
						transparent
						onPress={() => Actions.messenger({ user: item })}
					>
						<Text>View</Text>
					</Button>
				</Right>
			</ListItem>
		);
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
                    data={this.props.communications}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.uid}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { 
		unsuscribeCommunicationList,
		communications
	} = state.messenger;
    return { communications, unsuscribeCommunicationList };
};

export default connect(mapStateToProps, { 
    getCommunications
 })(MessageList);
