import React from 'react';
import {AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback, Dimensions, BackHandler,
    Clipboard, Platform, Share} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS, SHARING_ICONS} from "../utils/constants";
import {onCloseShare, onOpenShare} from "../actions/actionsGameData";

class EGScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /*componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        const { navigate } = this.props.navigation;
        navigate('HomeScreen');
        return true;
    }*/

    onClick() {
        Share.share({
            message: "I just completed a trail on Hikong! Check it out!",
            url: "https://hikong.masi-henallux.be/share/MDLKOZ",  //+ this.props.game.PlayerCode),
            title: "I just completed a trail on Hikong! Check it out!"
        }, {
            // Android only:
            dialogTitle: 'Share Hikong results',
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    // TODO implement sharing feature
    render() {
        //console.log(this.props.gameStats);
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <View style={styles.body}>
                    <Text style={styles.titleText}>{"Congrats\n"} /*+ this.props.teamInfo.name + "!"}*/</Text>
                    {(/*this.props.teamInfo.iconUrl === null*/true) ?
                        <Icon.Button name="circle"
                                     size={(Dimensions.get('window').width * 0.45)}
                                     color={/*this.props.teamInfo.ColorHex*/'red'}
                                     backgroundColor='transparent'
                                     style={styles.iconStyle}/>
                        :
                        <Image
                            resizeMode={'contain'}
                            style={{width: (Dimensions.get('window').width * 0.45), height: (Dimensions.get('window').width * 0.45)}}
                            source={{uri: "https://www.longree.be/data/teamAtBoLo.png"/*this.props.teamInfo.iconUrl*/ }}/>
                    }
                    <View style={styles.resultsView}>
                        <View style={styles.resultsPrompts}>
                            <Text style={styles.resultsPromptsText}>Time :</Text>
                            <Text style={styles.resultsPromptsText}>Score :</Text>
                            <Text style={styles.resultsPromptsText}>Position :</Text>
                        </View>
                        <View style={styles.results}>
                            <Text style={styles.resultsText}>{/*this.props.gameStats.time*/"3 hours"}</Text>
                            <Text style={styles.resultsText}>{/*this.props.gameStats.score*/"69"} pts</Text>
                            <Text style={styles.resultsText}>{/*this.props.gameStats.classement*/99}/{/*this.props.gameStats.totalTeams*/99}</Text>
                        </View>
                    </View>
                </View>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    // TODO implement Sharing feature
                    onPress={this.onClick()}
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

