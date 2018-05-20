import React from 'react';
import {COLORS, GAME_MODES} from '../utils/constants'
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';

export default class Menu extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView style={styles.container}>
               <Text>
                   Hello world !
               </Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
    }
});