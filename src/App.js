import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleProvider } from 'native-base'; 
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router';  
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

class App extends Component {
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </StyleProvider>
        );
    }
}

export default App;
