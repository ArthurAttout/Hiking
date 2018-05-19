import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,StatusBar,Image,Text
} from 'react-native';
import {COLORS} from "../utils/constants";

class GameCreatedScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }

    render() {

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#558b2f"
                    barStyle="light-content"
                />
                <Image
                    style={{height: '50%', resizeMode: 'contain'}}
                    source={require('../images/logo_512.png')}/>
                <View style={styles.codesView}>
                    <View style={styles.button}>
                        <Text style={styles.textHeader}>Player code</Text>
                        <Text style={styles.textCode}>{this.props.PlayerCode}</Text>
                    </View>

                    <View style={styles.separator}/>

                    <View style={styles.button}>
                        <Text style={styles.textHeader}>Game master code</Text>
                        <Text style={styles.textCode}>{this.props.GameMasterCode}</Text>
                    </View>

                </View>
                <View style={styles.copyrightView}>
                    <Text style={styles.copyrightText}>COPYRIGHT AtBoLo Team 2018</Text>
                </View>
            </View>
        );
    }

}

//Connect everything
export default GameCreatedScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    codesView: {
        width: '80%',
        height: 200,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: 20,
        borderRadius: 10,
    },
    textCode: {
        fontWeight: 'bold',
        color: COLORS.Primary,
        fontSize: 21,
        margin: 7,
    },
    textHeader: {
        fontWeight: 'bold',
        color: COLORS.Primary,
        fontSize: 17,
        margin: 1,
    },
    separator: {
        backgroundColor: COLORS.Secondary,
        height: 5,
        width: '90%',
    },
    copyrightView: {
        position: 'absolute',
        bottom:10,
    },
    copyrightText: {
        color: '#a4a4a4',
    },
});

