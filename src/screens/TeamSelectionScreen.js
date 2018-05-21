import React from 'react';
import {
    Alert, AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback,
    FlatList, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {joinTeam,fetchTeams} from "../actions/actionsJoinGame";
import {storeServerData, storeNextBeacon, storeTeamInfo} from "../actions/actionsGameData";
import {COLORS} from "../utils/constants";
import {
    isGameReady, getDataFromServer, getNextBeacon1, sendClientDataToServer,
    getTeamInfo
} from "../config/FakeServer";

// TODO disable the back button
// TODO automatically remove keyboard if player left it

class TSScreen extends React.Component {
    // TODO override parent navigationOptions to display headers
    static navigationOptions = {
        title: 'Choose your Team',
        headerStyle: {
            backgroundColor: '#558b2f',
        },
        headerTitleStyle: {
            color: '#ffffff',
        },
        headerLeft: null,
    };

    constructor(props) {
        super(props);
        this._onTeamPress = this._onTeamPress.bind(this);
    }

    componentWillMount(){
        this.props.fetchTeams();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <FlatList
                    data={this.props.teamsList}
                    style={styles.teamsList}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('grey')}
                                delayPressIn={0}
                                onPress={() => this._onTeamPress(item)}>
                                <View style={styles.teamsListView}>
                                    <Icon.Button name="circle"
                                                 size={50}
                                                 color={item.ColorHex}
                                                 backgroundColor='transparent'
                                                 style={styles.iconStyle}/>
                                    <Text style={styles.teamsListText}>
                                        {item.title}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                    )}
                />
            </View>
        );
    }

    _onTeamPress(item) {
        Alert.alert(
            'Join ' + item.title + ' ?',
            'You cannot change later !',
            [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => {
                        const teamTitle = item.title;
                        this.props.joinTeam(teamTitle);
/*
                        // TODO send data to server
                        sendClientDataToServer(this.props.gameCode,
                                                this.props.playerName,
                                                this.props.teamName);

                        // TODO get team info from server
                        const teamInfo = getTeamInfo(this.props.gameCode);
                        this.props.storeTeamInfo(teamInfo);

                        // TODO get data from server
                        const gameData = getDataFromServer(this.props.gameCode);
                        this.props.storeServerData(gameData);

                        // TODO get first beacon from server
                        const nextBeacon = getNextBeacon1(this.props.gameCode,
                                                            this.props.teamName);
                        console.log(nextBeacon);
                        this.props.storeNextBeacon(nextBeacon);

                        const {navigate} = this.props.navigation;
                        //TODO check how to get notification game is ready
                        if(false){
                            // True
                            navigate('GameScreen');
                        } else {
                            // False
                            navigate('GameNotStartedScreen');
                        }*/
                    }
                }
            ],
            { cancelable: false }
        )
    }
}


const mapStateToProps = (state) => {
    return {
        gameCode: state.joinGameReducer.gameCode,
        teamsList: state.joinGameReducer.teamsList
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchTeams: () => dispatch(fetchTeams()),
        joinTeam: (team) => dispatch(joinTeam(team)),
        storeTeamInfo: (teamInfo) => dispatch(storeTeamInfo(teamInfo)),
        storeServerData: (gameData) => dispatch(storeServerData(gameData)),
        storeNextBeacon: (nextBeacon) => dispatch(storeNextBeacon(nextBeacon))
    }
};

//Connect everything
export default TeamSelectionScreen = connect(mapStateToProps, mapDispatchToProps)(TSScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    teamsList: {
        width: '100%',
        backgroundColor:'transparent'
    },
    teamsListView: {
        flex: 1,
        flexDirection: 'row'
    },
    iconStyle:{
        marginLeft: 15,
        backgroundColor:'transparent',
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    teamsListText: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 25
    }
});

