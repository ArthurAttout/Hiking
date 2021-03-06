import React, { Component } from 'react';
import {
    Alert, AppRegistry, Text, TextInput, View, StyleSheet, Button, Switch,
    TouchableNativeFeedback,ScrollView
} from 'react-native';
import {TextInputLayout} from 'rn-textinputlayout';
import {MKCheckbox} from 'react-native-material-kit'
import {GAME_MODES} from '../utils/constants'
import {COLORS} from '../utils/constants'
import {
    switchMapEnabled,
    switchNextBeaconVisibility,
    switchDropDistanceVisible,
    setLives, setShrinkDelay,
    setTimerMaxRiddle, setChosenMode
} from "../actions/actionsSettingsGame";
import {connect} from "react-redux";
import CardView from 'react-native-cardview';


class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.mode1 = this.mode1.bind(this);
        this.mode2 = this.mode2.bind(this);
        this.mode3 = this.mode3.bind(this);

        this._onSubmit = this._onSubmit.bind(this);
    }

    render() {
        switch(this.props.chosenMode.mode){
            case GAME_MODES.NORMAL:
                return this.mode1();
            case GAME_MODES.RIDDLES:
                return this.mode2();
            case GAME_MODES.RIDDLES_AND_QR_CODE:
                return this.mode3();
        }
    }

    mode1(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styles.cardViewContent}>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor={COLORS.Primary_accent}
                        hintColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Speed of the shrink (meters per minute)'}
                            keyboardType='numeric'
                            onChangeText={this.props.setShrinkDelay}
                        />
                    </TextInputLayout>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the map
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.viewMapEnabled}
                            onValueChange={this.props.switchMapEnabled}/>
                    </View>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the next beacon location
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.nextBeaconVisibilityEnabled}
                            onValueChange={this.props.switchNextBeaconVisibilityEnabled}/>
                    </View>

                </CardView>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    delayPressIn={0}
                    onPress={this._onSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>START</Text>
                    </View>
                </TouchableNativeFeedback>
                </ScrollView>
            </View>
        );
    }

    mode2(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styles.cardViewContent}>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor={COLORS.Primary_accent}
                        hintColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Speed of the shrink (meters per minute)'}
                            keyboardType='numeric'
                            onChangeText={this.props.setShrinkDelay}
                        />
                    </TextInputLayout>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the map
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.viewMapEnabled}
                            onValueChange={this.props.switchMapEnabled}/>
                    </View>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the next beacon location
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.nextBeaconVisibilityEnabled}
                            onValueChange={this.props.switchNextBeaconVisibilityEnabled}/>
                    </View>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the distance to reach a "drop"
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.dropDistanceVisibilityEnabled}
                            onValueChange={this.props.switchDropDistanceVisible}/>
                    </View>

                </CardView>
                </ScrollView>
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    delayPressIn={0}
                    onPress={this._onSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>START</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    mode3(){
        return(
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollViewStyle}>

                <CardView
                    cardElevation={2}
                    cardMaxElevation={2}
                    cornerRadius={5}
                    style={styles.cardViewContent}>
                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor={COLORS.Primary_accent}
                        hintColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Speed of the shrink (meters per minute)'}
                            keyboardType='numeric'
                            onChangeText={this.props.setShrinkDelay}
                        />
                    </TextInputLayout>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the map
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.viewMapEnabled}
                            onValueChange={this.props.switchMapEnabled}/>
                    </View>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the next beacon location
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.nextBeaconVisibilityEnabled}
                            onValueChange={this.props.switchNextBeaconVisibilityEnabled}/>
                    </View>

                    <View style={styles.switchContainer}>
                        <Text
                            style={styles.switchLabel}>
                            Players can see the distance to reach a "drop"
                        </Text>
                        <Switch
                            style={styles.switch}
                            onTintColor={COLORS.Primary_accent}
                            value={this.props.dropDistanceVisibilityEnabled}
                            onValueChange={this.props.switchDropDistanceVisible}/>
                    </View>

                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor={COLORS.Primary_accent}
                        hintColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Number of lives'}
                            keyboardType='numeric'
                            onChangeText={this.props.setLives}
                        />
                    </TextInputLayout>

                    <TextInputLayout
                        style={styles.inputLayout}
                        focusColor={COLORS.Primary_accent}
                        hintColor={COLORS.Primary}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Timeout for riddles'}
                            keyboardType='numeric'
                            onChangeText={this.props.setTimerMaxRiddle}
                        />
                    </TextInputLayout>

                </CardView>

                </ScrollView>


                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('white')}
                    delayPressIn={0}
                    onPress={this._onSubmit}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>START</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        );
    }

    componentDidMount(){
        this.props.setChosenMode(this.props.chosenMode);
    }

    _onSubmit(){
        const { navigate } = this.props.navigation;
        navigate('CreateGameMapBeaconScreen');
    }
}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        viewMapEnabled:state.settingsReducer.viewMapEnabled,
        nextBeaconVisibilityEnabled:state.settingsReducer.nextBeaconVisibilityEnabled,
        dropDistanceVisibilityEnabled:state.settingsReducer.dropDistanceVisibilityEnabled,
        numberLives:state.settingsReducer.numberLives,
        timerMaxRiddle:state.settingsReducer.timerMaxRiddle,
        shrinkDelay:state.settingsReducer.shrinkDelay
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        switchMapEnabled: (evt) => dispatch(switchMapEnabled(evt)),
        switchNextBeaconVisibilityEnabled: (evt) => dispatch(switchNextBeaconVisibility(evt)),
        switchDropDistanceVisible: (evt) => dispatch(switchDropDistanceVisible(evt)),
        setLives: (evt) => dispatch(setLives(evt)),
        setTimerMaxRiddle: (evt) => dispatch(setTimerMaxRiddle(evt)),
        setShrinkDelay: (evt) => dispatch(setShrinkDelay(evt)),
        setChosenMode: (mode)=> dispatch(setChosenMode(mode)),
    }
}

//Connect everything
export default CreateGameSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        flexDirection: 'column',
        alignItems:'center'
    },
    textInput: {
        padding: 15,
        fontSize: 16,
        height: 40,
        alignSelf: 'stretch'
    },
    inputLayout:{
        paddingTop:15,
        width:'100%'
    },
    switch:{

    },
    switchLabel:{
        width:'70%',
        color:COLORS.Secondary,
    },
    switchContainer:{

        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        paddingTop: 50,
        width:'90%'
    },
    cardViewTitle: {
        flex:1,
        backgroundColor: COLORS.Secondary,
        marginTop:30,
        width:'100%',
        justifyContent:'center',
    },
    cardViewContent: {
        marginTop:10,
        flex:1,
        width:'90%',
        backgroundColor: '#ffffff',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        paddingTop: 20,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:50,
    },
    title:{
        fontSize:15,
        paddingStart:15,
        color:COLORS.Primary
    },
    button: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: COLORS.Secondary,
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 17,
        margin: 15,
    },
    scrollViewStyle: {
        flex:1,
        width:'100%',
        height:'100%'
    },
    contentContainerStyle:{
        flex:1,
        width:'100%',
        justifyContent:'center'
    }
});