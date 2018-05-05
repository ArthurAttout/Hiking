import React, { Component } from 'react';
import {
    Text, View, FlatList, StyleSheet, TouchableNativeFeedback,
    TextInput
} from 'react-native';
import {connect} from "react-redux";
import Modal from "react-native-modal";
import store from '../config/store'
import { Dropdown } from 'react-native-material-dropdown';
import {COLORS} from "../utils/constants";
import IconFoundation from 'react-native-vector-icons/Foundation';
import {addNewTeam,showModalTeamEditor,closeModalTeamEditor,populateDropdown} from '../actions/actionsAssignTeams'

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.populateDropdown();
    }

    render() {

        return(
            <View>
                <FlatList
                    keyExtractor={item => JSON.stringify(item.id)}
                    data={this.props.teams}
                    style={styles.flatList}
                    renderItem={({ item,index }) => (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('white')}
                            onPress={this.props.showModalTeamEditor}
                            delayPressIn={0}>
                            <View style={styles.nativeFeedbackStyle}>
                                {
                                    item.name === undefined ?
                                        <Text style={styles.textStyleBeacon}>
                                            Beacon {index + 1}
                                        </Text>
                                        :
                                        <Text style={styles.textStyleBeacon}>
                                            {item.name}
                                        </Text>
                                }
                            </View>
                        </TouchableNativeFeedback>
                    )}/>
                <IconFoundation.Button
                    name="plus"
                    color={COLORS.Secondary}
                    style={styles.addTeamButton}
                    underlayColor='#f0f0f0'
                    onPress={this.props.addNewTeam}
                    backgroundColor='transparent'
                    background={TouchableNativeFeedback.Ripple('blue')}
                    delayPressIn={0}>Add a team</IconFoundation.Button>

                <Modal
                    onBackdropPress={this.props.closeModalTeamEditor}
                    isVisible={this.props.modalTeamEditorVisible}>

                    <View
                        style={{ width:'100%',
                            height:'40%',
                            backgroundColor:'#ffffff',
                            justifyContent: 'center',
                            alignItems:'center',
                            flexDirection:'column'}}>
                        <View style={{width:'100%',height:'100%',justifyContent:'space-between', padding:35}}>
                            <TextInput
                                style={{width:'100%',height:80}}
                                placeholder={'Team name'}
                            />
                            <Dropdown
                                label='Track'
                                data={this.props.tracksDropdown}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        teams: state.assignTeamsReducer.teams,
        tracksDropdown: state.assignTeamsReducer.tracksDropdown,
        modalTeamEditorVisible: state.assignTeamsReducer.modalTeamEditorVisible,
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        populateDropdown: () => {dispatch(populateDropdown())},
        addNewTeam: () => {dispatch(addNewTeam())},
        showModalTeamEditor: () => {dispatch(showModalTeamEditor())},
        closeModalTeamEditor: () => {dispatch(closeModalTeamEditor())}
    }
}

//Connect everything
export default CreateGameAssignTeams = connect(mapStateToProps, mapDispatchToProps)(Screen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'column',
    },
    flatList: {
        backgroundColor: '#f3f3f3',
        width: '100%'
    },
    nativeFeedbackStyle: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        margin:15,
        backgroundColor : COLORS.Primary,
    },
    textStyleBeacon:{
        color:"#ffffff",
        textAlignVertical:'center',
        fontSize:18,
        marginLeft: 50,
        borderRadius:10
    },
    addTeamButton:{
        paddingTop:20,
        alignSelf:'center'
    },
});