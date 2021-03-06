import React from 'react';
import {AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback, Dimensions, BackHandler,
    Clipboard, Platform, Share} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";

class EGScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        /*const { navigate } = this.props.navigation;
        navigate('HomeScreen');*/
        return true;
    }

    onClick() {
        Share.share({
            ...Platform.select({
                ios: {
                    message: 'Check it out : ',
                    url: ('https://hikong.masi-henallux.be:5000/share/' + this.props.game.PlayerCode),
                },
                android: {
                    message: 'Check it out : \n' + ('https://hikong.masi-henallux.be:5000/share/' + this.props.game.PlayerCode)
                }
            }),
            title: 'I just completed a hike on Hikong!'
        }, {
            ...Platform.select({
                ios: {
                    // iOS only:
                    excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToTwitter'
                    ]
                },
                android: {
                    // Android only:
                    dialogTitle: 'Share your hike'
                }
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <View style={styles.body}>
                    <Text style={styles.titleText}>{"Congrats\n" + this.props.teamInfo.name}</Text>
                    {(this.props.teamInfo.iconUrl === null) ?
                        <Icon.Button name="circle"
                                     size={(Dimensions.get('window').width * 0.45)}
                                     color={this.props.teamInfo.ColorHex}
                                     backgroundColor='transparent'
                                     style={styles.iconStyle}/>
                        :
                        <Image
                            resizeMode={'contain'}
                            style={{width: (Dimensions.get('window').width * 0.45), height: (Dimensions.get('window').width * 0.45)}}
                            source={{uri: this.props.teamInfo.iconUrl }}/>
                    }
                    <View style={styles.resultsView}>
                        <View style={styles.resultsPrompts}>
                            <Text style={styles.resultsPromptsText}>Time :</Text>
                            <Text style={styles.resultsPromptsText}>Score :</Text>
                            <Text style={styles.resultsPromptsText}>Position :</Text>
                        </View>
                        <View style={styles.results}>
                            <Text style={styles.resultsText}>{this.props.gameStats.time}</Text>
                            <Text style={styles.resultsText}>{this.props.gameStats.score} pts</Text>
                            <Text style={styles.resultsText}>{this.props.gameStats.classement}/{this.props.gameStats.totalTeams}</Text>
                        </View>
                    </View>
                </View>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {this.onClick();}}
                >
                    <View style={styles.bottomView}>
                        <Icon size={24} color="white" name="share"/>
                        <Text style={styles.bottomText}>Share</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        teamInfo: state.gameDataReducer.teamInfo,
        gameStats: state.gameDataReducer.gameStats,
        game: state.gameDataReducer.game,
    }
};

function mapDispatchToProps(dispatch, own) {
    return {
        ...own,
    }
}

//Connect everything
export default EndGameScreen = connect(mapStateToProps, mapDispatchToProps)(EGScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    bottomView:{
        flexDirection: 'row',
        height: 56,
        width: '100%',
        /*elevation: 8,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,*/
        backgroundColor: COLORS.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    bottomText:{
        color: 'white',
        fontSize: 20,
        margin: 5,
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
    resultsView: {
        flex: 2,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        alignContent: 'space-around',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    resultsPrompts: {
        flex: 2,
        alignContent: 'space-around',
        justifyContent: 'space-around',
    },
    results: {
        flex: 3,
        justifyContent: 'space-around',
    },
    resultsPromptsText: {
        textAlign: 'right',
        fontSize: 20,
    },
    resultsText: {
        marginLeft: 10,
        marginRight: 25,
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
    iconStyle:{
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems: 'center'
    },
});

