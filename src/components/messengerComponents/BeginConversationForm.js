import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { 
    Container, 
    Content, 
    Form, 
    Picker, 
    Label, 
    Header, 
    Body, 
    Text, 
    Item, 
    Input,
    Button
} from 'native-base';
import { newCommunicationUpdate } from '../../actions';

class BeginConversationForm extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Body>
                            <Text>New Communication</Text>
                        </Body>
                    </Header>
                    <Form>
                        <Item>
                            <Label style={styles.labelStyle}>Category</Label>
                            <Picker
                                note
                                mode="dropdown"
                                selectedValue={this.props.category}
                                onValueChange={value => 
                                    this.props.newCommunicationUpdate({ prop: 'category', value })}
                            >
                                <Picker.Item label="Floorplan" value="key0" />
                                <Picker.Item label="General Query" value="key1" />
                                <Picker.Item label="Legal" value="key2" />
                                <Picker.Item label="Offers" value="key3" />
                            </Picker>
                        </Item>
                        <Item>
                            <Label style={styles.labelStyle}>To</Label>
                            <Picker
                                note
                                mode="dropdown"
                                selectedValue={this.props.to}
                                onValueChange={value => 
                                    this.props.newCommunicationUpdate({ prop: 'to', value })}
                            >
                                <Picker.Item label="Gareth Williams" value="key0" />
                                <Picker.Item label="Rhys Williams" value="key1" />
                                <Picker.Item label="Steve Stevenson" value="key2" />
                            </Picker>
                        </Item>
                        <Item>
                            <Label style={styles.labelStyle}>Title</Label>
                            <Input 
                                onChangeText={value => 
                                    this.props.newCommunicationUpdate({ prop: 'title', value })}
                                value={this.props.title}
                            />
                        </Item>
                        <Item>
                            <Label style={styles.labelStyle}>Message</Label>
                            <Input 
                                onChangeText={value => 
                                    this.props.newCommunicationUpdate({ prop: 'message', value })}
                                value={this.props.message}
                            />
                        </Item>
                        <View style={{ padding: 10, paddingTop: 50 }} >
                            <Button 
                                block 
                                primary
                            >
                                <Text>Start Communication</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = {
    labelStyle: {
        width: 80, 
        fontWeight: 'bold'
    }
};

const mapStateToProps = state => {
    const { 
        category, 
        to, 
        title, 
        message 
    } = state.messenger;

    return { category, to, title, message };
};

export default connect(mapStateToProps, { 
    newCommunicationUpdate
})(BeginConversationForm);
