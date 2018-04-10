import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps';

class BScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            time: '5:45',
            score: 1234,
            position: 3,
            totalParticipants: 14
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.Primary_accent}
                    barStyle="light-content"
                />
                <View style={styles.body}>
                    <Text style={styles.titleText}>Congrats!</Text>
                    <Image
                        style={{height: '50%', resizeMode: 'contain'}}
                        source={require('../images/logo_512.png')}/>
                    <View style={styles.resultsView}>
                        <View style={styles.resultsPrompts}>
                            <Text style={styles.resultsPromptsText}>Time :</Text>
                            <Text style={styles.resultsPromptsText}>Score :</Text>
                            <Text style={styles.resultsPromptsText}>Position :</Text>
                        </View>
                        <View style={styles.results}>
                            <Text style={styles.resultsText}>{this.state.time} min</Text>
                            <Text style={styles.resultsText}>{this.state.score} pts</Text>
                            <Text style={styles.resultsText}>{this.state.position}/{this.state.totalParticipants}</Text>
                        </View>
                    </View>
                </View>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    // TODO implement Sharing feature
                    //onPress={() => {}}
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
    }
};

//Connect everything
export default BeaconScreen = connect(mapStateToProps)(BScreen);

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
        margin: 5
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
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10
    },
    resultsPrompts: {
        flex: 2,
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
});

