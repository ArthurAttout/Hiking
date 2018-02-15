import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, View,StyleSheet,Button } from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';


export default class TestScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });
}
