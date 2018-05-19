import React from 'react';
import { AppRegistry, Text, View, StyleSheet, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";
import {COLORS} from "../utils/constants";
import MapView, { Marker } from 'react-native-maps';

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

        this.state = {
            beanconText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur sagittis ' +
            'vestibulum. Fusce sapien felis, consequat eu ex ut, aliquet consequat mauris. Vestibulum porttitor' +
            ' neque vestibulum velit blandit, et semper nunc iaculis. Vivamus nec tristique nulla. Quisque ' +
            'non eros a metus viverra fermentum. Etiam id neque vulputate augue rutrum ultricies eu posuere augue.'
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
                        style={{height: '45%', resizeMode: 'contain'}}
                        source={require('../images/logo_512.png')}/>
                    <Text style={styles.beaconText}>{this.state.beanconText}</Text>
                </View>

                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    onPress={() => {navigate('GameScreen');}}
                >
                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>NEXT BEACON</Text>
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
        margin: 30
    },
    beaconText: {
        fontSize: 17
    }
});

