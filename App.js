import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import HelloScreen from './src/screens/HelloScreen'
import HomeScreen from './src/screens/HomeScreen'
import FormLogin from './src/screens/FormLogin'
import CreateGameScreen from './src/screens/CreateGameScreen'
import JoinGameScreen from './src/screens/JoinGameScreen'
import GameNotStartedScreen from "./src/screens/GameNotStartedScreen";
import TeamSelectionScreen from "./src/screens/TeamSelectionScreen";

export default App = StackNavigator({
    HomeScreen: {screen: HomeScreen},
    CreateGameScreen: {screen: CreateGameScreen},
    JoinGameScreen: {screen: JoinGameScreen},
    TeamSelectionScreen: {screen: TeamSelectionScreen},
    GameNotStartedScreen: {screen: GameNotStartedScreen},
    FormLogin: {screen: FormLogin},
    HelloScreen: { screen: HelloScreen},
});
