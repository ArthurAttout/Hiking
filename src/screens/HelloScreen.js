import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, View,StyleSheet,Button } from 'react-native';

export default class HelloScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        },
    });

    constructor(props) {
        super(props);
        this.props.navigation.setParams({ title: " Hello, " + this.props.navigation.state.params.username});
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Text>Hello</Text>
        );
    }
}
