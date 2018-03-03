import React, { Component } from 'react';
import HelloScreen from './HelloScreen'
import HomeScreen from './HomeScreen'
import TestScreen from './TestScreen'
import FormLogin from './FormLogin'
import CreateGameScreen from './CreateGameScreen'
import {StackNavigator} from 'react-navigation';

export default App = StackNavigator({
    HomeScreen: {screen: HomeScreen},
    CreateGameScreen: {screen: CreateGameScreen},
    FormLogin: {screen: FormLogin},
    HelloScreen: { screen: HelloScreen},
    TestScreen: {screen: TestScreen}
});
