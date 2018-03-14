import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, View,StyleSheet,Button,Switch } from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import {MKCheckbox} from 'react-native-material-kit'

export default class CreateGameSettingsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>

                <Switch>
                </Switch>

            </View>
        );
    }

    mode1(){
        return (
            <View style={styles.container}>
                <TextInputLayout
                    style={styles.inputLayout}
                    focusColor='#000000'>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        placeholder={this.props.title}
                    />
                </TextInputLayout>
            </View>
        );
    }

    mode3(){
        return (
            <View style={styles.container}>

                <Switch>
                </Switch>

            </View>
        );
    }

    mode2(){
        return (
            <View style={styles.container}>
                <TextInputLayout
                    style={styles.inputLayout}
                    focusColor='#000000'>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        placeholder={this.props.title}
                    />
                </TextInputLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column'
    },
    textInput: {
        padding: 15,
        fontSize: 16,
        height: 60,
        alignSelf: 'stretch'
    },
    inputLayout:{
        padding: 15
    }
});