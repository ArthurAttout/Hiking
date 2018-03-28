import React from 'react';
import PropTypes from 'prop-types';
import {COLORS} from '../utils/constants'
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Foundation';
import CardView from 'react-native-cardview'
import {Dimensions,StyleSheet, ScrollView,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
    },
    flatList:{
        flex:1,
        backgroundColor:'#f9f9f9',
        width:'100%'
    },
    header:{
        backgroundColor:COLORS.Secondary,
        marginBottom:1,
        width:'auto',
        padding:15,
    },
    title:{
        textDecorationLine:'underline',
        textAlign:'center',
        fontSize:30,
        paddingBottom:30,
        color:"#000000"
    },
    text:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    addTrackButton:{
        paddingTop:20,
        alignSelf:'center'
    },
    headerText:{
        color:"#FFFFFF"
    }
});

export default class Menu extends React.Component{

    constructor(props){
        super(props);

        this._renderContent = this._renderContent.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>
                    All tracks
                </Text>
                <Accordion
                    sections={this.props.userTracks}
                    style={styles.flatList}
                    underlayColor="#f0f0f0"
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                />
                <Icon.Button
                    name="plus"
                    color={COLORS.Secondary}
                    style={styles.addTrackButton}
                    underlayColor='#f0f0f0'
                    onPress={this.props.onAddNewTrack}
                    backgroundColor='transparent'
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}/>
            </View>
        );
    }
    _renderHeader(section) {
        return (

                <CardView
                    style={styles.header}
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}>
                    <Text style={styles.headerText}>Track ({section.beacons.length} beacons set)</Text>
                </CardView>

        );
    }

    _renderContent(section) {
        return (
            <View style={{flex:1, flexDirection: 'row',justifyContent:'center'}}>
                <Icon.Button
                    name="pencil"
                    color={COLORS.Secondary}
                    backgroundColor='transparent'
                    onPress={() => {this.props.onEditTrack(section)}}
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}/>
                <Icon.Button
                    name="trash"
                    color='#FF0017'
                    backgroundColor='transparent'
                    onPress={() => {this.props.onDeleteTrack(section)}}
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}/>
            </View>
        );
    }

}
