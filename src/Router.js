import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/authComponents/LoginForm';
import UserCreate from './components/authComponents/UserCreate';
import Dashboard from './components/dashboardComponents/Dashboard';
import Landing from './components/Landing';
import SellerLocation from './components/newListingComponents/SellerLocation';
import AddressList from './components/newListingComponents/Address/AddressList';
import AddressForm from './components/newListingComponents/Address/AddressForm';
import PropertyDetails from './components/newListingComponents/PropertyDetails';
import Confirmation from './components/newListingComponents/Confirmation';
import Evaluation from './components/newListingComponents/Evaluation';

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
                                                
                    />
                    <Scene 
                        key="sellerLocation"
                        component={SellerLocation}                        
                    />
                    <Scene 
                        key="addressList"
                        component={AddressList}                        
                    />
                    <Scene 
                        key="addressForm"
                        component={AddressForm}                        
                    />
                    <Scene
                        key="propertyDetails"
                        component={PropertyDetails}
                    />
                    <Scene
                        key="evaluation"
                        component={Evaluation} initial
                    />                    
                    <Scene
                        key="confirmation"
                        component={Confirmation} 
                    />
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
