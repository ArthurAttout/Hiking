import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, View,StyleSheet,Button } from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import CardView from 'react-native-cardview';

export default class FormLogin extends React.Component {
  static navigationOptions = {
    title: 'Welcome !',
  };

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
    this.state = {username:'', password: ''};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <CardView
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}
            style={styles.cardView}>
            <TextInputLayout
                style={styles.inputLayout}
                focusColor='#000000'>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Email'}
                    onChangeText={(username) => this.setState({username})}
                />
            </TextInputLayout>
            <TextInputLayout
                style={styles.inputLayoutLast}
                focusColor='#000000'>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
            </TextInputLayout>
            <Button
              style={styles.button}
              onPress={this._onPressButton}
              title="Login"
            />
        </CardView>
      </View>
    );
  }

  _onPressButton() {
    const { navigate } = this.props.navigation;
    navigate('HomeScreen',this.state);
  }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#266184'
    },
    textInput: {
        fontSize: 16,
        height: 60
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    inputLayoutLast: {
        marginTop: 16,
        marginHorizontal: 36,
        marginBottom: 100
    },
    cardView: {
        width: 500,
        height: 420,
        backgroundColor: '#ffffff'
    },
    button: {
        margin: 150,
        padding: 150
    }
});
