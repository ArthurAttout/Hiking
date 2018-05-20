import React from 'react';
import Modal from "react-native-modal";
import {StyleSheet, ScrollView, TextInput,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';

export default class SolveRiddleModal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
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
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'35%',
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
        width:'95%',
        height:60,
        alignSelf:'center',
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