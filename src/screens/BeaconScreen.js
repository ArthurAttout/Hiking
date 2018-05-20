import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import {getNextBeacon2} from "../config/FakeServer";
import {
    onCloseModal, onConfirmRiddleSolving, onRequestModal, setCurrentAnswer, storeEndGameStats,
    storeNextBeacon, submitButtonPressed
} from "../actions/actionsGameData";
import SolveRiddleModal from "./PlayerBeaconModals/SolveRiddleModal";

class BScreen extends React.Component {
    static navigationOptions = {
        title: 'Zone Name',      // TODO replace with team name from redux
        headerStyle: {
            backgroundColor: COLORS.Primary
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerLeft: null
    };

    constructor(props) {
        super(props);

        this.handleOnPress = this.handleOnPress.bind(this);
    }

    render() {
        // TODO manage beacon text for the different modes
        // TODO fix image size to dynamic (45% seems good)
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <View style={styles.topMessageView}>
                    <Text style={styles.topMessageText}>{this.props.nextBeacon.name}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.titleText}>Congrats!</Text>
                    <Image
                        resizeMode={'contain'}
                        style={{width: 230, height: 230}}
                        source={{uri: this.props.nextBeacon.iconUrl }}/>
                    <Text style={styles.beaconText}>
                        {(this.props.gameData.gameMode === 1) ?
                            "You successfully reached the " + this.props.nextBeacon.name + " beacon!"
                            :
                            this.props.nextBeacon.riddleStatement}</Text>
                </View>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {this.handleOnPress()}}
                >
                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>{(this.props.gameData.gameMode === 1) ? "NEXT BEACON" : "SOLVE" }</Text>
                    </View>
                </TouchableNativeFeedback>
                {this._renderModal()}
            </View>
        );
    }

    handleOnPress(){
        const { navigate } = this.props.navigation;
        if(this.props.gameData.gameMode === 1){
            // TODO get next beacon
            const nextBeacon = getNextBeacon2(this.props.gameCode,
                this.props.teamName);
            this.props.storeNextBeacon(nextBeacon);
            console.log(nextBeacon);
            navigate('GameScreen');
        } else {
            // TODO manage solving riddles
            this.props.onRequestModal();
        }
    }

    _renderModal(){
        return(
        <SolveRiddleModal
            modalVisible={this.props.modalVisible}
            currentAnswer = {this.props.currentAnswer}
            correctAnswer = {this.props.correctAnswer}
            isSubmitButtonPressed = {this.props.isSubmitButtonPressed}
            submitButtonPressed = {this.props.submitButtonPressed}
            setCurrentAnswer={this.props.setCurrentAnswer}
            onConfirmRiddleSolving={this.props.onConfirmRiddleSolving}
            onCloseModal={this.props.onCloseModal}/>
        );
    }
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        gameData: state.gameDataReducer.gameData,
        nextBeacon: state.gameDataReducer.nextBeacon,
        modalVisible: state.gameDataReducer.modalVisible,
        currentAnswer: state.gameDataReducer.currentAnswer,
        correctAnswer: state.gameDataReducer.correctAnswer,
        isSubmitButtonPressed: state.gameDataReducer.isSubmitButtonPressed
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
        storeNextBeacon: (nextBeacon) => dispatch(storeNextBeacon(nextBeacon)),
        onCloseModal: () => dispatch(onCloseModal()),
        onRequestModal: () => dispatch(onRequestModal()),
        onConfirmRiddleSolving: () => dispatch(onConfirmRiddleSolving()),
        setCurrentAnswer: (answer) => dispatch(setCurrentAnswer(answer)),
        submitButtonPressed: () => dispatch(submitButtonPressed()),
    }
}

//Connect everything
export default BeaconScreen = connect(mapStateToProps, mapDispatchToProps)(BScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    topMessageView: {
        backgroundColor: '#558b2f',
        padding: 10,
        width: '100%'
    },
    topMessageText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomView:{
        height: 56,
        width: '100%',
        elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.Primary,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '5%'
    },
    bottomText:{
        color: 'white',
        fontSize: 20,
    },
    body: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 56
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10
    },
    beaconText: {
        fontSize: 17
    }
});

