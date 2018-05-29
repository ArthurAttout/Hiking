'use strict';

import store from '../config/store'; //Import the store
import React, { Component } from 'react';
import {
    Button, View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback,
    ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getGameModes} from '../actions/actionsChooseMode'; //Import your actions
import {COLORS} from '../utils/constants'


class Screen extends React.Component {

    constructor(props) {
        super(props);

        this._onClickGame = this._onClickGame.bind(this);
        this._onClickInfo = this._onClickInfo.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    accuracy: position.coords.accuracy,
                    error: null,
                };
                this.props.storeCurrentLocation(currentPosition);
                console.log("initial Geolocation was a success");
                console.log(currentPosition);
            },
            (error) => {
                const currentPosition = {
                    error: error.message,
                };
                this.props.storeCurrentLocation(currentPosition);
                console.log("initial Geolocation was a failure");
                console.log(currentPosition);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 3600000
            },
        );
    }

    render() {
        if(this.props.loading){
            return(
                <ActivityIndicator/>
            )
        }
        else {

            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.props.gameModes}
                        style={styles.flatList}
                        keyExtractor={item => item.title}
                        renderItem={({ item }) => (
                            <View
                                style={styles.buttonViewStyle}>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('white')}
                                    onPress={this._onClickGame.bind(null,item)}
                                    delayPressIn={0}>
                                    <View style={styles.nativeFeedbackStyle}>
                                        <Text style={styles.textStyleMode}>
                                            {item.title}
                                        </Text>
                                        <Icon.Button name="info-circle"
                                             color="#ffffff"
                                             backgroundColor='transparent'
                                             onPress={this._onClickInfo.bind(null,item)}
                                             style={styles.iconStyle}
                                             background={TouchableNativeFeedback.Ripple('white')}
                                             delayPressIn={0}/>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        )}/>
                </View>
            );
        }
    }

    _onClickGame(itemClicked){
        const { navigate } = this.props.navigation;
        navigate('CreateGameSettingsScreen',{chosenMode:itemClicked});
    }

    _onClickInfo(itemClicked){
        Alert.alert("Rules",itemClicked.info);
    }


    componentDidMount(){
        this.props.getGameModes();
    }
}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        loading: state.gameModesReducer.loading,
        gameModes: state.gameModesReducer.data
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        getGameModes: () => dispatch(getGameModes())
    }
}

//Connect everything
const ChooseModeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
export default ChooseModeScreen;

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonViewStyle:{
        flex: 1,
        padding: 15
    },
    cardViewItem: {
        height: 140,
        fontSize: 50
    },
    listContainer:{
        height:500,
    },
    flatList: {
        alignSelf:'stretch',
        backgroundColor:'transparent'
    },
    list: {
        width: 400,
        height: 90,
        backgroundColor: 'transparent'
    },
    nativeFeedbackStyle: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        backgroundColor : COLORS.Secondary,
        borderRadius:4
    },
    textStyleMode:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    iconStyle:{
        backgroundColor:'transparent',
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});
