import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, View,StyleSheet,Button } from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
}
