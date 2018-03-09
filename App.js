import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import HelloScreen from './src/screens/HelloScreen'
import HomeScreen from './src/screens/HomeScreen'
import FormLogin from './src/screens/FormLogin'
import store from './src/config/store'; //Import the store
import { Provider } from 'react-redux';
import CreateGameScreen from './src/screens/CreateGameScreen'
import JoinGameScreen from './src/screens/JoinGameScreen'
import GameNotStartedScreen from "./src/screens/GameNotStartedScreen";
import TeamSelectionScreen from "./src/screens/TeamSelectionScreen";

const RootStack = StackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        },
        CreateGameScreen: {
            screen: CreateGameScreen
        },
    },
    {
        initialRouteName: 'HomeScreen',
        navigationOptions: {
            header:null
        },
    }
);

class AppWithNavigationState extends React.Component {
    render() {
        return (
            <RootStack />
        );
    }
}


export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }
}