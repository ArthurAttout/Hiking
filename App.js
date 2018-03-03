import React, { Component } from 'react';
import HelloScreen from './HelloScreen'
import HomeScreen from './HomeScreen'
import TestScreen from './TestScreen'
import FormLogin from './FormLogin'
import CreateGameScreen from './CreateGameScreen'
import JoinGameScreen from './JoinGameScreen'
import {StackNavigator} from 'react-navigation';
import GameNotStartedScreen from "./GameNotStartedScreen";

export default App = StackNavigator({
    HomeScreen: {screen: HomeScreen},
    CreateGameScreen: {screen: CreateGameScreen},
    JoinGameScreen: {screen: JoinGameScreen},
    GameNotStartedScreen: {screen: GameNotStartedScreen},
    FormLogin: {screen: FormLogin},
    HelloScreen: { screen: HelloScreen},
    TestScreen: {screen: TestScreen}
});
