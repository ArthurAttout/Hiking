'use strict';

import React, { Component } from 'react';
import CardView from 'react-native-cardview';
import {View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/actionsCreateGame'; //Import your actions

class CreateGameScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
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
                            background={TouchableNativeFeedback.Ripple('grey')}
                            delayPressIn={0}>
                            <View style={styles.nativeFeedbackStyle}>
                                <Text style={styles.textStyleMode}>
                                    {item.title}
                                </Text>
                                <Icon.Button name="info-circle"
                                 color="#000000"
                                 backgroundColor='transparent'
                                 style={styles.iconStyle}
                                 onPress={() => {
                                     Alert.alert(item.title,item.info);
                                 }}/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    )}/>
            </View>
        );
    }

    componentDidMount() {
        this.props.getGameModes(); //call our action
    }
}

function mapStateToProps(state, props) {
    return {
        loading: state.gameModesReducer.loading,
        gameModes: state.gameModesReducer.data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(CreateGameScreen);

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#FFFFFF'
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
        //fontFamily: 'Feather',
        //fontSize: 15,
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
});
