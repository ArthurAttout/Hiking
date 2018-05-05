import UUIDGenerator from 'react-native-uuid-generator';
import store from '../config/store'
export const ADD_NEW_TEAM = 'ADD_NEW_TEAM';
export const SHOW_MODAL_TEAM_EDITOR = 'SHOW_MODAL_TEAM_EDITOR';
export const CLOSE_MODAL_TEAM_EDITOR = 'CLOSE_MODAL_TEAM_EDITOR';
export const POPULATE_DROPDOWN = 'POPULATE_DROPDOWN';

export const addNewTeam = () => {
    return{
        type:ADD_NEW_TEAM,
        id:UUIDGenerator.getRandomUUID(),
    }
};

export const showModalTeamEditor = () => {
    return{
        type:SHOW_MODAL_TEAM_EDITOR
    }
};

export const closeModalTeamEditor = () => {
    return{
        type:CLOSE_MODAL_TEAM_EDITOR
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