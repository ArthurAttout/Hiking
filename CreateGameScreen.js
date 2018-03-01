import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import {View, Text, FlatList, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

import {getGameModes} from "./FakeServer";

export default class CreateGameScreen extends Component {

    constructor() {
        super();
        this.state = {
            data : getGameModes()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        style={styles.flatList}
                        keyExtractor={item => item.title}
                        renderItem={({ item }) => (
                        <View
                            style={styles.buttonViewStyle}>
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                delayPressIn={0}>
                                <View style={styles.nativeFeedbackStyle}>
                                    <Text style={styles.textStyleMode}>
                                        {item.title}
                                    </Text>
                                    <Icon.Button name="info-circle"
                                         color="#000000"
                                         backgroundColor='transparent'
                                         style={styles.iconStyle}/>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        )}
                    />
            </View>
        );
    }

    _onValidate() {

    }
};


const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#266184'
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
        width: 400,
        height: 90,
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
        backgroundColor:'#FFFFFF',
        borderRadius:4
    },
    textStyleMode:{
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    iconStyle:{
        backgroundColor:'transparent',
        fontFamily: 'Feather',
        fontSize: 15,
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});
