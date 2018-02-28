/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Clipboard,
    Platform
} from 'react-native';

import FCM from "react-native-fcm";

import {registerKilledListener, registerAppListener} from "./Listeners";
import firebaseClient from  "./FirebaseClient";

registerKilledListener();

export default class App extends Component {
};
