import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,StatusBar,Image,Text
} from 'react-native';
import {connect} from "react-redux";
import Menu from './GameMasterSideMenu'
import MapView,{Polyline} from 'react-native-maps';
import SideMenu from 'react-native-side-menu'
import {changeSideMenuOpened,forceRefresh,setContinuousRefresh,updatePositions,
        setIntervalID} from "../actions/actionsGameMasterScreen";

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
        const menu = <Menu/>;

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
                        initialRegion={this.props.centerRegion}/>
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