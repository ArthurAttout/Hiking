import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,StatusBar,Image,Text
} from 'react-native';
import {connect} from "react-redux";
import Menu from './GameMasterSideMenu'
import MapView,{Marker} from 'react-native-maps';
import SideMenu from 'react-native-side-menu'
import {changeSideMenuOpened,forceRefresh,setContinuousRefresh,updatePositions,
        showBeaconsOfTeam,startGame,onRequestModal} from "../actions/actionsGameMasterScreen";

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.continuousRefresh){
            this.intervalID = setInterval(() => {
                this.props.updatePositions();
            },3000);
        }else {
            clearInterval(this.intervalID);
        }
    }

    componentWillUnmount(){
        console.log("kill interval");
        clearInterval(this.intervalID);
    }

    render() {
        const menu =
            <Menu
                teams={this.props.teams}
                startGame={this.props.startGame}
                onRequestModal={this.props.onRequestModal}
                showStartButton={this.props.showStartButton}
                />;

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
                            this.props.teams.map((team) =>
                                <Marker
                                    pinColor={team.color}
                                    key={JSON.stringify(team.id)}
                                    coordinate={team.coordinate}/>)
                        }
                    </MapView>
                </View>
            </SideMenu>
        );
    }

}
const mapStateToProps = (state, own) => {
    return {
        ...own,
        sideMenuOpened: state.gameMasterScreenReducer.sideMenuOpened,
        centerRegion: state.gameMasterScreenReducer.centerRegion,
        continuousRefresh: state.gameMasterScreenReducer.continuousRefresh,
        teams: state.gameMasterScreenReducer.teams,
        intervalID: state.gameMasterScreenReducer.intervalID,
        showStartButton: state.gameMasterScreenReducer.showStartButton,
        gameStarted: state.gameMasterScreenReducer.gameStarted,

    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        changeSideMenuOpened:(state) => dispatch(changeSideMenuOpened(state)),
        forceRefresh:() => dispatch(forceRefresh()),
        updatePositions:() => dispatch(updatePositions()),
        setIntervalID:(id) => dispatch(setIntervalID(id)),
        setContinuousRefresh: () => dispatch(setContinuousRefresh()),
        showBeaconsOfTeam:(team) => dispatch(showBeaconsOfTeam()),
        startGame:() => dispatch(startGame()),
        onRequestModal:(team) => dispatch(onRequestModal(team)),
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