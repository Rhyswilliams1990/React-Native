import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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
    Button,
    Title,
    Left,
    Icon,
    Right
} from 'native-base';
import { newCommunicationUpdate, clearCommunicationScreen } from '../../actions';


class BeginCommunicationForm extends Component {    
    componentDidMount() {
        this.props.clearCommunicationScreen();
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <Header>
                        <Left style={{ flex: 0 }}>
                            <Icon onPress={() => Actions.pop()} name='arrow-back' />
                        </Left>
                        <Body style={{ flex: 1, paddingLeft: 45 }}>
                            <Title>New Communication</Title>
                        </Body>
                        <Right style={{ flex: 0 }} />
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
                                <Picker.Item label='Please select...' value='0' />
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
                                <Picker.Item label='Please select...' value='0' />
                                <Picker.Item label="Gareth Williams" value="key0" />
                                <Picker.Item label="Rhys Williams" value="key1" />
                                <Picker.Item label="Steve Stevenson" value="key2" />
                            </Picker>
                        </Item>
                        <Item>
                            <Label style={styles.labelStyle}>Title</Label>
                            <Input 
                                placeholder='Enter title...'
                                onChangeText={value => 
                                    this.props.newCommunicationUpdate({ prop: 'title', value })}
                                value={this.props.title}
                            />
                        </Item>
                        <Item stackedLabel>     
                            <Label style={styles.labelStyle}>Message</Label>                      
                            <Input 
                                placeholder='Hello! Could you help me...'
                                style={{ height: 100, textAlignVertical: 'top' }}
                                multiline
                                onChangeText={value => 
                                    this.props.newCommunicationUpdate({ prop: 'message', value })}
                                value={this.props.message}
                            />
                        </Item>
                        <View style={{ padding: 10, paddingTop: 50 }} >
                            <Button 
                                block 
                                info
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlignVertical: 'top'
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
    newCommunicationUpdate,
    clearCommunicationScreen
})(BeginCommunicationForm);
