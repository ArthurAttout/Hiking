import React from 'react';
import {
    Alert, AppRegistry, Text, View, StyleSheet, TouchableNativeFeedback,
    FlatList, StatusBar, BackHandler, Keyboard
} from 'react-native';
import tinycolor from 'tinycolor2'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {joinTeam,fetchTeams} from "../actions/actionsJoinGame";
import {storeCurrentLocation} from "../actions/actionsGameData";
import {COLORS} from "../utils/constants";

class TeamItem extends React.PureComponent {
    render() {
        return (
            <View>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('grey')}
                    delayPressIn={0}
                    onPress={() => this.props._onTeamPress(this.props.item)}>
                    <View style={this.props.styles.teamsListView}>
                        <Icon.Button name="circle"
                                     size={50}
                                     color={this.props.item.ColorHex}
                                     backgroundColor='transparent'
                                     style={this.props.styles.iconStyle}/>
                        <Text style={this.props.styles.teamsListText}>
                            {this.props.item.name}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

class TSScreen extends React.Component {

    constructor(props) {
        super(props);
        this._onTeamPress = this._onTeamPress.bind(this);
    }

    componentDidMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        Keyboard.dismiss();
    }

   /* componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }*/

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
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <TeamItem
                            _onTeamPress={this._onTeamPress}
                            item={item}
                            styles={styles}
                        />
                    )}
                />
            </View>
        );
    }

    _renderFlatListItem(item) {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('grey')}
                delayPressIn={0}
                onPress={this._onTeamPress(item)}>
                <View style={styles.teamsListView}>
                    <Icon.Button name="circle"
                                 size={50}
                                 color={tinycolor(item.ColorHex)}
                                 backgroundColor='transparent'
                                 style={styles.iconStyle}/>
                    <Text style={styles.teamsListText}>
                        {item.name}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
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

