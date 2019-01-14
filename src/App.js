import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

import { StyleProvider } from 'native-base';   
import getTheme from '../native-base-theme/components';

class App extends Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <StyleProvider style={getTheme()}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </StyleProvider>
        );
    }
}

export default App;