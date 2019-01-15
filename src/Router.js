import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/authComponents/LoginForm';
import UserCreate from './components/authComponents/UserCreate';
import Dashboard from './components/dashboardComponents/Dashboard';
import Landing from './components/Landing';
//import SellerLocation from './components/newListingComponents/SellerLocation';

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
                
                <Scene 
                    initial
                    key="newListing"
                >
                    <Scene 
                        key="landing"
                        component={Landing}
                        initial
                    />
                    {/* <Scene 
                        key="location"
                        component={SellerLocation}                        
                    /> */}
                </Scene>
                <Scene key="existingListing">
                    <Scene
                        key="dashboard"
                        component={Dashboard}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
