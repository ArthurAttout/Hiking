import React, { Component } from 'react';
import {
    Text, View, FlatList, StyleSheet, TouchableNativeFeedback,
    TextInput, ScrollView
} from 'react-native';
import {connect} from "react-redux";
import Modal from "react-native-modal";
import store from '../config/store'
import { ColorPicker } from 'react-native-color-picker'
import { Dropdown } from 'react-native-material-dropdown';
import {COLORS} from "../utils/constants";
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFoundation from 'react-native-vector-icons/Foundation';
import {addNewTeam,showModalTeamEditor,closeModalTeamEditor,onTeamColorChange,
    populateDropdown,teamNameChanged,deleteTeam,showColorPicker,closeColorPicker} from '../actions/actionsAssignTeams'

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.populateDropdown();
    }

    render() {


        return(
                <ScrollView>
                    <FlatList
                        keyExtractor={item => JSON.stringify(item.id)}
                        data={this.props.teams}
                        style={styles.flatList}
                        renderItem={({item, index}) => (
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('white')}
                                onPress={() => {
                                    this.props.showModalTeamEditor(item)
                                }}
                                delayPressIn={0}>
                                <View style={styles.nativeFeedbackStyle}>
                                    {
                                        item.track === undefined ?
                                            <Text style={styles.textStyleBeacon}>
                                                {item.name}
                                            </Text>
                                            :
                                            <Text style={styles.textStyleBeacon}>
                                                {item.name + " - " + item.track.trackName + " (" + (item.track.totalDistance / 1000).toFixed(2) + "km)"}
                                            </Text>
                                    }
                                    {
                                        item.color !== undefined ?
                                            <IconAwesome name="circle" size={30} color={item.color} style={{alignSelf:'center',marginRight:15}} />
                                            :
                                            <View/>
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

                    {
                        this.props.isValid ?
                            <IconFoundation.Button
                                name="check"
                                color={COLORS.Secondary}
                                style={{alignSelf: 'flex-end'}}
                                underlayColor='#f0f0f0'
                                onPress={() => {
                                    console.log(this.props.allSettings);
                                    const {navigate} = this.props.navigation;
                                    navigate('RecapitulativeScreen', {
                                        teams: this.props.teams,
                                        navigation: this.props.navigation,
                                        settings: this.props.allSettings,
                                    });
                                }}
                                backgroundColor='transparent'
                                background={TouchableNativeFeedback.Ripple('blue')}
                                delayPressIn={0}>Finish</IconFoundation.Button>

                            :

                            <View/>
                    }

                    <Modal
                        onBackdropPress={() => {
                            let team = this._dropdown.selectedItem();
                            this.props.closeModalTeamEditor(team)
                        }}
                        isVisible={this.props.modalTeamEditorVisible}>

                        <View
                            style={{
                                width: '100%',
                                height: '58%',
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                            <View style={{width: '100%', height: '100%', justifyContent: 'space-between', padding: 35}}>
                                    <TextInput
                                        style={{width: '100%', height: 80}}
                                        onChangeText={(text) => {
                                            this.props.teamNameChanged(text)
                                        }}
                                        placeholder={'Team name'}
                                    />
                                    <IconMaterial.Button
                                        name="color-lens"
                                        style={{width: '20%', height: '15%', margin: 5, alignSelf: 'center'}}
                                        color="#000000"
                                        onPress={this.props.showColorPicker}
                                        backgroundColor='transparent'
                                        background={TouchableNativeFeedback.Ripple('blue')}
                                        delayPressIn={0}/>

                                <Dropdown
                                    ref={component => this._dropdown = component}
                                    label='Track'
                                    value={
                                        this.props.currentEditingTeam === undefined || this.props.currentEditingTeam.track === undefined ?
                                            undefined
                                            :
                                            this.props.currentEditingTeam.track.trackName}
                                    data={this.props.tracksDropdown}/>
                                <IconAwesome.Button
                                    name="trash-o"
                                    style={{width: '20%', height: '15%', margin: 15, alignSelf: 'center'}}
                                    color="#000000"
                                    onPress={this.props.deleteTeam}
                                    backgroundColor='transparent'
                                    background={TouchableNativeFeedback.Ripple('blue')}
                                    delayPressIn={0}/>

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        onBackdropPress={this.props.closeColorPicker}
                        isVisible={this.props.colorPickerVisible}>
                        <View
                            style={{
                                width: '100%',
                                height: '48%',
                                backgroundColor: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                            <View style={{width: '100%', height: '100%', justifyContent: 'space-between', padding: 35}}>
                                <ColorPicker
                                    onColorChange={this.props.onTeamColorChange}
                                    style={{flex: 1}}
                                />
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            );

    }

}

const mapStateToProps = (state, own) => {
    return {
        ...own,
        teams: state.assignTeamsReducer.teams,
        tracksDropdown: state.assignTeamsReducer.tracksDropdown,
        modalTeamEditorVisible: state.assignTeamsReducer.modalTeamEditorVisible,
        currentEditingTeam: state.assignTeamsReducer.currentEditingTeam,
        allSettings: state.settingsReducer,
        isValid: state.assignTeamsReducer.isValid,
        colorPickerVisible: state.assignTeamsReducer.colorPickerVisible,
    }
};

function mapDispatchToProps(dispatch,own) {
    return {
        ...own,
        populateDropdown: () => {dispatch(populateDropdown())},
        addNewTeam: () => {dispatch(addNewTeam())},
        showModalTeamEditor: (team) => {dispatch(showModalTeamEditor(team))},
        closeModalTeamEditor: (track) => {dispatch(closeModalTeamEditor(track))},
        teamNameChanged: (name) => {dispatch(teamNameChanged(name))},
        deleteTeam: () => {dispatch(deleteTeam())},
        showColorPicker: () => {dispatch(showColorPicker())},
        closeColorPicker: () =>{dispatch(closeColorPicker())},
        onTeamColorChange: (color) => {dispatch(onTeamColorChange(color))},
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
        backgroundColor : COLORS.Secondary,
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