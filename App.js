import React, { Component } from 'react';
import {TextInputLayout} from 'rn-textinputlayout';
import HomeScreen from './HomeScreen'
import FormLogin from './FormLogin'
import {StackNavigator} from 'react-navigation';

export default App = StackNavigator({
    FormLogin: {screen: FormLogin},
    HomeScreen: { screen: HomeScreen }
});
