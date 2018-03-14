import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import HelloScreen from './src/screens/HelloScreen'
import HomeScreen from './src/screens/HomeScreen'
import store from './src/config/store'; //Import the store
import { Provider } from 'react-redux';
import Screen from './src/screens/ChooseModeScreen'
import JoinGameScreen from './src/screens/JoinGameScreen'
import GameNotStartedScreen from "./src/screens/GameNotStartedScreen";
import TeamSelectionScreen from "./src/screens/TeamSelectionScreen";
import CreateGameSettingsScreen from "./src/screens/CreateGameSettingsScreen";


const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props;
                return (
                    <Provider store={store}>
                        <SomeComponent {...params} {...this.props}/>
                    </Provider>
            )
        }
    }
};

const RootStack = StackNavigator(
    {
        HomeScreen: {screen: mapNavigationStateParamsToProps(HomeScreen)},
        ChooseModeScreen: {screen: mapNavigationStateParamsToProps(Screen)},
        CreateGameSettingsScreen: {screen: mapNavigationStateParamsToProps(CreateGameSettingsScreen)},
        JoinGameScreen: {screen: mapNavigationStateParamsToProps(JoinGameScreen)},
        GameNotStartedScreen: {screen: mapNavigationStateParamsToProps(GameNotStartedScreen)},
        TeamSelectionScreen: {screen: mapNavigationStateParamsToProps(TeamSelectionScreen)},
        HelloScreen: {screen: mapNavigationStateParamsToProps(HelloScreen)},
    },
    {
        initialRouteName: 'HomeScreen',
        navigationOptions: {
            header:null
        },
    }
);


export default class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <RootStack />
            </Provider>
        )
    }
}