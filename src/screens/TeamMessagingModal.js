import React from 'react';
import {COLORS} from '../utils/constants'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../config/selection.json';
const IconCustom = createIconSetFromIcoMoon(icomoonConfig);
import {StyleSheet, ScrollView, TextInput,Button,ActivityIndicator,
    View, Image, Text,FlatList, TouchableNativeFeedback} from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";

export default class TeamMessagingModal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let buttonOrProgress = this.props.showMessagingProgress ?
            <ActivityIndicator/>
            :
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('white')}
                style={{width:'100%',height:'10%'}}
                onPress={this.props.sendMessage}
                delayPressIn={0}>
                <View style={styles.nativeFeedbackStyle}>
                    <Text style={styles.textStyle}>
                        Confirm
                    </Text>
                </View>
            </TouchableNativeFeedback>;

        return(
            <Modal
                onBackdropPress={this.props.closeTeamMessagingModal}
                isVisible={this.props.teamMessagingModalVisible}>

                <View style={{ width:'100%',
                    height:'50%',
                    backgroundColor:'#ffffff',
                    justifyContent: 'center',
                    alignItems:'center',
                    flexDirection:'column'}}>
                    <View style={{width:'100%',height:'100%',justifyContent:'space-between', padding:35}}>

                        <TextInput
                            style={{width:'100%',height:'20%'}}
                            placeholder={'Title'}
                            multiline={true}
                            value={this.props.messageTitle}
                            onChangeText={this.props.setMessageTitle}
                        />
                        <TextInput
                            style={{width:'100%',height:'50%'}}
                            placeholder={'Body'}
                            value={this.props.messageBody}
                            onChangeText={this.props.setMessageBody}
                        />
                        {
                            buttonOrProgress
                        }

                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    nativeFeedbackStyle: {
        margin:5,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width:'100%',
        backgroundColor : "#f0f0f0",
        borderRadius:4
    },
    textStyle:{
        color:"#000000",
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:12,
        borderRadius:10
    },
});
