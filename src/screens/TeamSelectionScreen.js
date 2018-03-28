import React from 'react';
import {
    Alert, AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getGameTeams} from "../config/FakeServer";
import {connect} from "react-redux";
import {joinTeam} from "../actions/actionsJoinGame";

class TSScreen extends React.Component {
    static navigationOptions = {
        title: 'Choose your teamName',
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
        this.state = {
            teamName: '',
            teams: getGameTeams()
        };
        this._onTeamPress = this._onTeamPress.bind(this);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.teams}
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
                                                 color="#a4a4a4"
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
                        const { navigate } = this.props.navigation;
                        navigate('GameNotStartedScreen');
                    }
                }
            ],
            { cancelable: false }
        )
    }
}


/*const mapStateToProps = (state, own) => {
    return {
        ...own,
        gameCode: state.joinGameReducer.gameCode,
        playerName: state.joinGameReducer.playerName
    }
};*/

const mapDispatchToProps = (dispatch) =>{
    return {
        joinTeam: (team) => dispatch(joinTeam(team)),
    }
};

//Connect everything
export default TeamSelectionScreen = connect(null, mapDispatchToProps)(TSScreen);

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

