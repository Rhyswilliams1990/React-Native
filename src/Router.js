import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/authComponents/LoginForm';
import UserCreate from './components/authComponents/UserCreate';
import HomeForm from './components/homeComponents/HomeForm';

const RouterComponent = () => {
    return (
        <Router headerMode="none">
            <Scene key="root">
                <Scene key="auth">
                    <Scene
                        key="login"
                        component={LoginForm}
                    />
                    <Scene
                        key="userCreate"
                        component={UserCreate}
                    />
                </Scene>
                
                <Scene key="main">
                    <Scene
                        key="profile"
                        component={HomeForm}
                    />
                </Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;