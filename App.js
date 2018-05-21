import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import HelloScreen from './src/screens/HelloScreen';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/config/store'; //Import the store
import { Provider } from 'react-redux';
import ChooseModeScreen from './src/screens/ChooseModeScreen';
import JoinGameScreen from './src/screens/JoinGameScreen';
import GameMasterScreen from './src/screens/GameMasterScreen';
import GameNotStartedScreen from "./src/screens/GameNotStartedScreen";
import TeamSelectionScreen from "./src/screens/TeamSelectionScreen";
import GameCreatedScreen from './src/screens/GameCreatedScreen';
import CreateGameSettingsScreen from "./src/screens/CreateGameSettingsScreen";
import CreateGameMapBeacon from "./src/screens/CreateGameMapBeacon";
import GameScreen from "./src/screens/GameScreen";
import CreateGameAssignTeams from "./src/screens/CreateGameAssignTeams";
import BeaconScreen from "./src/screens/BeaconScreen";
import RecapitulativeScreen from "./src/screens/RecapitulativeScreen"
import EndGameScreen from "./src/screens/EndGameScreen";
import GameOverScreen from "./src/screens/GameOverScreen";

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
        ChooseModeScreen: {screen: mapNavigationStateParamsToProps(ChooseModeScreen)},
        CreateGameSettingsScreen: {screen: mapNavigationStateParamsToProps(CreateGameSettingsScreen)},
        CreateGameAssignTeams:{screen: mapNavigationStateParamsToProps(CreateGameAssignTeams)},
        RecapitulativeScreen:{screen: mapNavigationStateParamsToProps(RecapitulativeScreen)},
        JoinGameScreen: {screen: mapNavigationStateParamsToProps(JoinGameScreen)},
        GameCreatedScreen:{screen: mapNavigationStateParamsToProps(GameCreatedScreen)},
        GameNotStartedScreen: {screen: mapNavigationStateParamsToProps(GameNotStartedScreen)},
        GameMasterScreen:{screen:mapNavigationStateParamsToProps(GameMasterScreen)},
        TeamSelectionScreen: {screen: mapNavigationStateParamsToProps(TeamSelectionScreen)},
        HelloScreen: {screen: mapNavigationStateParamsToProps(HelloScreen)},
        CreateGameMapBeaconScreen: {screen: mapNavigationStateParamsToProps(CreateGameMapBeacon)},
        GameScreen: {screen: mapNavigationStateParamsToProps(GameScreen)},
        BeaconScreen: {screen: mapNavigationStateParamsToProps(BeaconScreen)},
        EndGameScreen: {screen: mapNavigationStateParamsToProps(EndGameScreen)},
        GameOverScreen: {screen: mapNavigationStateParamsToProps(GameOverScreen)}
    },
    {
        initialRouteName: 'HomeScreen',
        navigationOptions: {
            header:null
        },
    }
);

export let navigatorRef;
export default class App extends React.Component {
    componentDidMount() {
        navigatorRef = this.navigator;
    }
    render() {
        return(
            <Provider store={store}>
                <RootStack ref={nav => { this.navigator = nav; }}  />
            </Provider>
        )
    }
}