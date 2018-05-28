import React from 'react';
import {AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, BackHandler, ToastAndroid} from 'react-native';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import FCM, {FCMEvent} from "react-native-fcm";
import {storeCurrentLocation} from "../actions/actionsGameData";
import {registerMessageTeam} from "../actions/notificationsActions";

class GNSScreen extends React.Component {
    static navigationOptions = {
        title: 'Game Not Started',
        header: null,
        headerLeft: null
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.startGameNowRegistered){
            FCM.on(FCMEvent.Notification, notif => {
                if(notif['startGameNow']){ //Expected notification
                    const { navigate } = this.props.navigation;
                    navigate("GameScreen");
                }
            });
            this.props.registerMessageTeam();
        }

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <View style={styles.topView}>
                    <View style={styles.topMessageView}>
                        <Text style={styles.topMessageText}>The game has not started yet !</Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={require('../images/logo_512.png')}/>
                </View>
                <View style={styles.codesView}>
                    <View style={styles.codesPrompts}>
                        <Text style={styles.codesPromptsText}>Game code :</Text>
                        <Text style={styles.codesPromptsText}>Player name :</Text>
                        <Text style={styles.codesPromptsText}>Team name :</Text>
                    </View>
                    <View style={styles.codesEntered}>
                        <Text style={styles.codesEnteredText}>{this.props.gameCode}</Text>
                        <Text style={styles.codesEnteredText}>{this.props.playerName}</Text>
                        <Text style={styles.codesEnteredText}>{this.props.teamName}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        playerName: state.joinGameReducer.playerName,
        gameCode: state.joinGameReducer.gameCode,
        teamName: state.joinGameReducer.teamName,
        startGameNowRegistered: state.notificationsReducer.startGameNowRegistered,
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        registerMessageTeam: () => dispatch(registerMessageTeam()),
    }
};


//Connect everything
export default GameNotStartedScreen = connect(mapStateToProps)(GNSScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    topView: {
        flex: 6,
        width: '100%',
    },
    topMessageView: {
        backgroundColor: '#558b2f',
        padding: 10,
    },
    topMessageText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        flex: 1,
        height: '70%',
        resizeMode: 'contain',
        backgroundColor: '#85bb5c',
        alignSelf: 'center'
    },
    codesView: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        alignContent: 'space-around',
        justifyContent: 'center',
    },
    codesPrompts: {
        flex: 2,
        justifyContent: 'space-around',
    },
    codesEntered: {
        flex: 3,
        justifyContent: 'space-around',
    },
    codesPromptsText: {
        textAlign: 'right',
        fontSize: 20,
    },
    codesEnteredText: {
        marginLeft: 10,
        marginRight: 50,
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
});

