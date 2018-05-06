import UUIDGenerator from 'react-native-uuid-generator';
import store from '../config/store'
import tinycolor from 'tinycolor2'
export const ADD_NEW_TEAM = 'ADD_NEW_TEAM';
export const SHOW_MODAL_TEAM_EDITOR = 'SHOW_MODAL_TEAM_EDITOR';
export const CLOSE_MODAL_TEAM_EDITOR = 'CLOSE_MODAL_TEAM_EDITOR';
export const POPULATE_DROPDOWN = 'POPULATE_DROPDOWN';
export const TEAM_NAME_CHANGED = 'TEAM_NAME_CHANGED';
export const DELETE_TEAM = 'DELETE_TEAM';
export const SHOW_COLOR_PICKER = 'SHOW_COLOR_PICKER';
export const CLOSE_COLOR_PICKER = 'CLOSE_COLOR_PICKER';
export const TEAM_COLOR_CHANGE = 'TEAM_COLOR_CHANGE';

export const addNewTeam = () => {
    return{
        type:ADD_NEW_TEAM,
        id:UUIDGenerator.getRandomUUID(),
    }
};

export const showModalTeamEditor = (team) => {
    return{
        type:SHOW_MODAL_TEAM_EDITOR,
        team: team,
    }
};

export const closeModalTeamEditor = (track) => {
    return{
        type:CLOSE_MODAL_TEAM_EDITOR,
        track: track
    }
};

export const populateDropdown = () =>{
    return{
        type: POPULATE_DROPDOWN,
        tracksDropdown: store.getState().createGameMapReducer.tracks.map((item)=>{
            return{
                ...item,
                value: item.trackName
            }
        })
    }
};

export const teamNameChanged = (name) => {
    return{
        type: TEAM_NAME_CHANGED,
        newname: name,
    }
};

export const deleteTeam = () => {
    return{
        type:DELETE_TEAM,
    }
};

export const showColorPicker = () => {
    return{
        type: SHOW_COLOR_PICKER
    }
};

export const closeColorPicker = () => {
    return{
        type: CLOSE_COLOR_PICKER
    }
};

export const onTeamColorChange = (color) =>{
    let colorRGB = tinycolor(color);
    console.log(colorRGB.toHexString());
    return{
        type: TEAM_COLOR_CHANGE,
        color: colorRGB.toHexString()
    }
};