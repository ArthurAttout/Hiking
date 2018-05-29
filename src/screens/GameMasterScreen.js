import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,StatusBar,Image,Text
} from 'react-native';
import {connect} from "react-redux";
import Menu from './GameMasterSideMenu'
import MapView,{Marker,Circle} from 'react-native-maps';
import SideMenu from 'react-native-side-menu'
import {
    changeSideMenuOpened, forceRefresh, setContinuousRefresh, updatePositions, showTeamMessagingModal, sendMessage,
    showBeaconsOfTeam, startGame, onRequestModal, closeTeamMessagingModal, setMessageBody, setMessageTitle,
    onShowTeamBeacons, retrieveTeams
} from "../actions/actionsGameMasterScreen";
import {shrinkZone} from "../actions/actionsGameData";
import tinycolor from 'tinycolor2'
import TeamMessagingModal from "./TeamMessagingModal";

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.teams.length === 0 && this.props.isGameStarted){ //The game was already started when gameMaster entered
            this.props.retrieveTeams();
        }

        this.intervalID = setInterval(() => {
            this.props.updatePositions();
        },3000);

        this.shrinkIntervalID = undefined;
        if(this.props.settings.tresholdShrink !== 0) {
            shrinkIntervalID = setInterval(() => {
                this.props.shrinkZone()
            }, 60000);
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
        this.intervalID = undefined;
    }


    render() {
        const menu =
            <Menu
                teams={this.props.teams}
                onShowTeamBeacons={this.props.onShowTeamBeacons}
                isGameStarted={this.props.isGameStarted}
                onTeamPress={this.props.showTeamMessagingModal}
                startGame={this.props.startGame}
                showStartButton={!this.props.isGameStarted}
                showProgressStart={this.props.showProgressStart}
                errorMessage={this.props.errorMessage}/>;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.props.sideMenuOpened}
                onChange={(state) => {this.props.changeSideMenuOpened(state)}}
                menuPosition='right'>
                <View
                    style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={this.props.centerRegion}>
                        {
                            this.props.teams.map((team) =>{
                                return(
                                    <Marker
                                        key={team.id}
                                        title={"Team : " + team.name}
                                        pinColor={tinycolor(team.color).toHexString()}
                                        coordinate={team.coordinate}/>
                                )
                            })
                        }
                        {
                            this.props.beaconsToShow.map((beacon,index) => {
                                console.log("Key : " + beacon.idBeacon);
                                return(
                                    <Marker
                                        key={"Beacon__" + beacon.id}
                                        title={beacon.name == null ?
                                            "Beacon : " + index
                                        :
                                            "Beacon : " + beacon.name}
                                        coordinate={beacon}/>
                                )
                            })
                        }
                        <Circle
                            center={{
                                latitude: this.props.settings.center_x,
                                longitude: this.props.settings.center_y
                            }}
                            radius={this.props.settings.radius}
                            strokeColor={'red'}
                            strokeWidth={2}
                        />
                    </MapView>
                </View>
                <TeamMessagingModal
                    setMessageTitle={this.props.setMessageTitle}
                    setMessageBody={this.props.setMessageBody}
                    sendMessage={this.props.sendMessage}
                    showMessagingProgress={this.props.showMessagingProgress}
                    teamDesination={this.props.teamDestination}
                    closeTeamMessagingModal={this.props.closeTeamMessagingModal}
                    teamMessagingModalVisible={this.props.teamMessagingModalVisible}/>
            </SideMenu>
        );
    }

}
const mapStateToProps = (state, own) => {
    return {
        ...own,
        settings: state.gameDataReducer.settings,
        sideMenuOpened: state.gameMasterScreenReducer.sideMenuOpened,
        centerRegion: state.gameMasterScreenReducer.centerRegion,
        continuousRefresh: state.gameMasterScreenReducer.continuousRefresh,
        teams: state.gameMasterScreenReducer.teams,
        intervalID: state.gameMasterScreenReducer.intervalID,
        showStartButton: state.gameMasterScreenReducer.showStartButton,
        gameStarted: state.gameMasterScreenReducer.gameStarted,
        showMessagingProgress: state.gameMasterScreenReducer.showMessagingProgress,
        teamDestination: state.gameMasterScreenReducer.teamDestination,
        errorMessage: state.gameMasterScreenReducer.errorMessage,
        showProgressStart: state.gameMasterScreenReducer.showProgressStart,
        beaconsToShow: state.gameMasterScreenReducer.beaconsToShow,
        messageTitle: state.gameMasterScreenReducer.messageTitle,
        isGameStarted: state.joinGameReducer.isGameStarted,
        messageBody: state.gameMasterScreenReducer.messageBody,
        teamMessagingModalVisible: state.gameMasterScreenReducer.teamMessagingModalVisible,
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        changeSideMenuOpened:(state) => dispatch(changeSideMenuOpened(state)),
        forceRefresh:() => dispatch(forceRefresh()),
        updatePositions:() => dispatch(updatePositions()),
        setContinuousRefresh: () => dispatch(setContinuousRefresh()),
        shrinkZone: () => dispatch(shrinkZone()),
        showBeaconsOfTeam:(team) => dispatch(showBeaconsOfTeam()),
        startGame:() => dispatch(startGame()),
        onRequestModal:(team) => dispatch(onRequestModal(team)),
        onShowTeamBeacons: (team) => dispatch(onShowTeamBeacons(team)),
        closeTeamMessagingModal:() => dispatch(closeTeamMessagingModal()),
        showTeamMessagingModal: (team) => dispatch(showTeamMessagingModal(team)),
        setMessageTitle: (title) => dispatch(setMessageTitle(title)),
        setMessageBody: (body) => dispatch(setMessageBody(body)),
        sendMessage: () => dispatch(sendMessage()),
        retrieveTeams : () => dispatch(retrieveTeams()),
    }
}

//Connect everything
export default GameMasterScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    map: {
        height: '100%',
        width: '100%',
    },
    bottomNavigation:{
        height: 56,
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    }
});