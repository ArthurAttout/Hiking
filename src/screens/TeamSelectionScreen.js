import React from 'react';
import {
    Alert, AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback,
    FlatList, StatusBar, BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {joinTeam,fetchTeams} from "../actions/actionsJoinGame";
import {storeCurrentLocation} from "../actions/actionsGameData";
import {COLORS} from "../utils/constants";


// TODO disable the back button
// TODO automatically remove keyboard if player left it

class TSScreen extends React.Component {

    constructor(props) {
        super(props);
        this._onTeamPress = this._onTeamPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    componentWillMount(){
        this.props.fetchTeams();

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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
                    keyExtractor={item => item.name}
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
                                        {item.name}
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
            'Join ' + item.name + ' ?',
            'You cannot change later !',
            [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => {
                        item.name;
                        this.props.joinTeam(item.name, item.idTeam);
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
        joinTeam: (teamName, teamId) => dispatch(joinTeam(teamName, teamId)),
        storeCurrentLocation: (currentLocation) => dispatch(storeCurrentLocation(currentLocation)),
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

