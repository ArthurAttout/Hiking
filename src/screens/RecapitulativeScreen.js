import React, { Component } from 'react';
import {GAME_MODES} from '../utils/constants'
import {
    Text, View, FlatList, StyleSheet, TouchableNativeFeedback,
    TextInput, ScrollView
} from 'react-native';
import {connect} from "react-redux";
import Modal from "react-native-modal";
import store from '../config/store'
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import {COLORS} from "../utils/constants";
import IconFoundation from 'react-native-vector-icons/Foundation';
import {addNewTeam,showModalTeamEditor,closeModalTeamEditor,populateDropdown,teamNameChanged} from '../actions/actionsAssignTeams'
import GameCreatedScreen from "./GameCreatedScreen";
import {prepareRequest} from "../utils/constants";

class RecapitulativeScreen extends React.Component {

    constructor(props) {
        super(props);
        this._onConfirm = this._onConfirm.bind(this);
    }

    render() {
        const settings = this._renderSettingsChosen();
        return(
            <ScrollView
                style={{flex:1}}>
                <Text
                    style={{margin:15,fontSize:20}}>
                    Is this correct ?
                </Text>
                <View style={{width:'100%',height:50,backgroundColor:COLORS.Secondary}}>
                    <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:20,padding:5}}>
                        Mode
                    </Text>
                </View>
                <Text
                    style={{margin:8,marginTop:15, fontSize:15, color:"#000000"}}>
                    Chosen mode : {this.props.settings.chosenMode.title}
                </Text>
                <View style={{width:'100%',height:50,backgroundColor:COLORS.Secondary}}>
                    <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:20,padding:5}}>
                        Settings
                    </Text>
                </View>
                {settings}
                <View style={{width:'100%',height:50,backgroundColor:COLORS.Secondary}}>
                    <Text style={{color:"#ffffff", fontWeight:"bold", fontSize:20,padding:5}}>
                        Teams
                    </Text>
                </View>
                <FlatList
                    data={this.props.teams}
                    keyExtractor={item => JSON.stringify(item.id)}
                    renderItem={({item,index}) => (
                        <View
                            style={{flex:1,
                                flexDirection: 'row',
                                justifyContent: 'space-between'}}>
                            <Text style={styles.teamItemStyle}>{item.name + ' - ' + item.track.trackName + " (" + (item.track.totalDistance/1000).toFixed(2) + "km)"}</Text>
                            {
                                item.color !== undefined ?
                                    <IconAwesome name="circle" size={30} color={item.color} style={{alignSelf:'center',marginRight:15}} />
                                    :
                                    <View/>
                            }
                        </View>
                    )}
                />
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    delayPressIn={0}
                    onPress={this._onConfirm}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>OH YES IT IS</Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        );
    }

    _renderSettingsChosen(){
        switch(this.props.settings.chosenMode.mode){
            case GAME_MODES.NORMAL:
                return(
                    <View>
                        <Text style={styles.settingStyle}>Delay between each zone shrink (meters per minute) : {this.props.settings.shrinkDelay} </Text>
                        <Text style={styles.settingStyle}>Players can see the map : {this.props.settings.viewMapEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Players can see the next beacon location : {this.props.settings.nextBeaconVisibilityEnabled ? "Yes" : "No"}</Text>
                    </View>);

            case GAME_MODES.RIDDLES:
                return(
                    <View>
                        <Text style={styles.settingStyle}>Delay between each zone shrink (meters per minute) : {this.props.settings.shrinkDelay} </Text>
                        <Text style={styles.settingStyle}>Players can see the map : {this.props.settings.viewMapEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Players can see the next beacon location : {this.props.settings.nextBeaconVisibilityEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Players can see the distance to reach a "drop" : {this.props.settings.dropDistanceVisibilityEnabled ? "Yes" : "No"}</Text>
                    </View>);

            case GAME_MODES.RIDDLES_AND_QR_CODE:
                return(
                    <View>
                        <Text style={styles.settingStyle}>Delay between each zone shrink (meters per minute) : {this.props.settings.shrinkDelay} </Text>
                        <Text style={styles.settingStyle}>Players can see the map : {this.props.settings.viewMapEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Players can see the next beacon location : {this.props.settings.nextBeaconVisibilityEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Players can see the distance to reach a "drop" : {this.props.settings.dropDistanceVisibilityEnabled ? "Yes" : "No"}</Text>
                        <Text style={styles.settingStyle}>Number of lives : {this.props.settings.numberLives}</Text>
                        <Text style={styles.settingStyle}>Timer maximum for riddles : {this.props.settings.timerMaxRiddle}</Text>
                    </View>);
        }
    }

    _onConfirm(){
        let params = {
            gameMode:                   this.props.settings.chosenMode.mode,
            tresholdShrink:             RecapitulativeScreen.standardizeNumber(this.props.settings.shrinkDelay),
            mapViewEnable:              this.props.settings.viewMapEnabled !== undefined,
            displayDropDistance:        this.props.settings.dropDistanceVisibilityEnabled !== undefined,
            timerRiddle:                RecapitulativeScreen.standardizeNumber(this.props.settings.timerMaxRiddle),
            lives:                      RecapitulativeScreen.standardizeNumber(this.props.settings.numberLives),
            enableNextBeaconVisibility: this.props.settings.nextBeaconVisibilityEnabled !== undefined,

            teams: this.props.teams.map((team) => {
                return{
                    name:       RecapitulativeScreen.standardizeText(team.name),
                    colorHex:   RecapitulativeScreen.standardizeHexColor(team.color),
                    iconURL:    null,
                    trip:{
                        name:               RecapitulativeScreen.standardizeText(team.track.trackName),
                        distance:           team.track.totalDistance,
                        heighDifference:    team.track.altitudeDelta,
                        beacons:            team.track.path.map((beacon) => {
                            let filteredBeacon = team.track.beacons.filter((b) => b.id === beacon.id)[0];
                            return{
                                name:       RecapitulativeScreen.standardizeText(filteredBeacon.name),
                                latitude:   beacon.latitude,
                                longitude:  beacon.longitude,
                                iconURL:    RecapitulativeScreen.standardizeText(filteredBeacon.imageServerURL),
                                qrCodeID:   RecapitulativeScreen.standardizeText(filteredBeacon.qrCode),
                                riddle:     RecapitulativeScreen.standardizeRiddle(filteredBeacon.riddle)
                            }
                        })
                    }
                }
            })
        };

        console.log(params);

        let request = prepareRequest(params,"POST");

        fetch('https://hikong.masi-henallux.be:5000/game',request)
            .then ((response) => {
                console.log(response);
                return response.json()
            })
            .then ((json) => {
                const { navigate } = this.props.navigation;
                navigate('GameCreatedScreen',json);
            })
            .catch((error) => {

                console.error("Error  : " + error);
            });
    }

    static standardizeNumber(input){
        return input === undefined ? 0 : input;
    }

    static standardizeText(input){
        return input === undefined || input === null || input === '' ? null : input;
    }
    static standardizeRiddle(riddle){
        return riddle === undefined ?
            {
                statement : "",
                answer: "",
            }
            :
            {
                statement: riddle.statement,
                answer: riddle.answer,
            }
    }
    static standardizeHexColor(input){
        return input === "" || input === undefined || input === null ? "#ffffff" : input;
    }
}


//Connect everything
export default RecapitulativeScreen;

const styles = StyleSheet.create({
    settingStyle:{
        margin:8,
        fontSize:15,
        color:'#000000'
    },
    teamItemStyle:{
        margin:8,
        fontSize:15,
        color:'#000000'
    },
    button: {
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Secondary,
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 17,
        margin: 15,
    },
});