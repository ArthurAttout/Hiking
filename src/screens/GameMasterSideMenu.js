import React from 'react';
import {COLORS, GAME_MODES} from '../utils/constants'
import {StyleSheet, ScrollView, TextInput,FlatList,ActivityIndicator,
    View, Image, Text, TouchableNativeFeedback} from 'react-native';

export default class Menu extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        if(this.props.showStartButton){
            return(
                <ScrollView style={styles.container}>
                    <Text style={{
                        textAlign:'center'
                    }}>
                        {
                            this.props.errorMessage === undefined ?
                                "The game has not started yet ! Touch the button when you're ready"
                                :
                                this.props.errorMessage
                        }
                    </Text>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        delayPressIn={0}
                        style={styles.button}
                        onPress={this.props.startGame}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>START GAME</Text>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>
            )
        }
        else {
            if(this.props.showProgressStart){
                return(
                    <ScrollView style={styles.container}>
                        <ActivityIndicator/>
                    </ScrollView>
                )
            }
            else
            {
                return(
                    <ScrollView style={styles.container}>
                        <FlatList
                            data={this.props.teams}
                            style={styles.flatList}
                            keyExtractor={item => JSON.stringify(item.id)}
                            renderItem={({ item,index }) => (
                                <View
                                    style={styles.buttonViewStyle}>
                                    <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('white')}
                                        onPress={() => {this.props.onRequestModal(item)}}
                                        delayPressIn={0}>
                                        <View style={styles.nativeFeedbackStyle}>
                                            <Text style={styles.textStyleTeam}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )}/>
                    </ScrollView>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
    },
    textStyleTeam:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    button: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: COLORS.Secondary,
        margin: 20,
        borderRadius: 10,
    },
    nativeFeedbackStyle: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor : "#c6c6c6",
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 17,
        margin: 15,
    },
    flatList:{
        backgroundColor:'#f3f3f3',
        width:'100%'
    },
    buttonViewStyle:{
        width:'100%',
        padding: 2
    },
});