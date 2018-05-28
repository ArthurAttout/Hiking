import React from 'react';
import {AppRegistry, Text, View, StyleSheet, StatusBar, Image,
    TouchableNativeFeedback, Dimensions, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";

class GOScreen extends React.Component {
    static navigationOptions = {
    };

    constructor(props) {
        super(props);
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    render() {
        return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={COLORS.Primary_accent}
                        barStyle="light-content"
                    />
                    <View style={styles.topMessageView}>
                        <Text style={styles.topMessageText}>{this.props.teamInfo.name}</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.titleText}>Game Over</Text>
                        <Icon name="emoji-sad"
                                     size={(Dimensions.get('window').width * 0.45)}
                                     color={COLORS.Primary}
                                     backgroundColor='transparent'
                                     style={styles.iconStyle}/>
                        <Text style={styles.beaconText}>
                            {"It looks like the princess was in another castle all along.\n" +
                            "But do not despair, for it is not the end goal that matters, but the friends you make" +
                            " along the way. \n\nFind your way to the last beacon to complete your journey."}
                        </Text>
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('white')}
                        onPress={() => {this.handleOnPress()}}
                    >
                        <View style={styles.bottomView}>
                            <Text style={styles.bottomText}>LAST BEACON ></Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
        );
    }

    handleOnPress(){
        const { navigate } = this.props.navigation;
        navigate('GameScreen');
    }
}


const mapStateToProps = (state, own) => {
    return {
        ...own,
        teamInfo: state.gameDataReducer.teamInfo,
    }
};


//Connect everything
export default GameOverScreen = connect(mapStateToProps)(GOScreen);

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height - 23),
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
        textAlign: 'center'
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

