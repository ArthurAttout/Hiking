import React from 'react';
import Modal from "react-native-modal";
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback, Dimensions, Vibration} from 'react-native';
import {COLORS, GAME_MODES} from "../../utils/constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SolveRiddleModal extends React.Component{

    constructor(props){
        super(props);
        this.renderStars = this.renderStars.bind(this);
    }

    render(){
        if(this.props.isSubmitButtonPressed) {
            Vibration.vibrate(1000);
        }

        return(
            <Modal
                onBackdropPress={() => {this.props.onCloseModal()}}
                isVisible={this.props.modalVisible}>

                <View style={styles.container}>

                    <View
                        style={styles.textInputView}>
                        <TextInput
                            style={[styles.textInput, (this.props.isSubmitButtonPressed) ? {color: 'red'} : {color: 'black'} ]}
                            placeholder={'Answer'}
                            value={this.props.currentAnswer}
                            onChangeText={(answer) => this.props.setCurrentAnswer(answer)}
                        />
                    </View>

                    <View style={styles.stars}>
                    {this.renderStars()}
                    </View>

                    <View
                        style={styles.buttons}>

                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('grey')}
                            style={styles.button}
                            onPress={() => {this.props.onCloseModal()}}
                            delayPressIn={0}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('grey')}
                            style={styles.button}
                            onPress={() => {
                                this.props.onConfirmRiddleSolving(this.props.navigation);
                                this.props.submitButtonPressed();
                            }}
                            delayPressIn={0}>
                            <Text style={styles.buttonText}>
                                Confirm
                            </Text>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </Modal>
        )
    }

    renderStars() {
        if(this.props.game.GameMode !== GAME_MODES.NORMAL){
            let stars = [];

            for(let i = this.props.game.lives; i > 0; i--) {
                // TODO manage lifes lost
                if(this.props.teamInfo.lives < i){
                    stars.push(
                        <Icon key={i} style={{color: 'red'}} size={(Dimensions.get('window').height * 0.04)}
                                         color={COLORS.Primary} name="heart-outline"/>
                    )
                } else {
                    stars.push(
                        <Icon key={i} style={{color: 'red'}} size={(Dimensions.get('window').height * 0.04)}
                                         color={COLORS.Primary} name="heart"/>
                    )
                }
            }

            return stars;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        //width:'100%',
        //height:'35%',
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height * 0.35),
        backgroundColor:'#ffffff',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    textInputView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        flexDirection:"row",
        width:'100%',
        height:'100%'
    },
    textInput:{
        width: '100%',
        height:60,
        alignSelf:'center',
    },
    stars:{
        //flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    buttons:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    button:{
        flex: 2
    },
    buttonText: {
        fontSize:19,
        padding:15
    },
});