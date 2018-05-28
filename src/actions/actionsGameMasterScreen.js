
import store from '../config/store'
import {fetchingTeams} from "./actionsJoinGame";
export const FORCE_REFRESH= 'FORCE_REFRESH';
export const CHANGE_GAMEMASTER_SIDE_MENU_OPENED = 'CHANGE_GAMEMASTER_SIDE_MENU_OPENED';
export const SET_CONTINUOUS_REFRESH = 'SET_CONTINUOUS_REFRESH';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';
export const FETCHING_NEW_POSITIONS  = 'FETCHING_NEW_POSITIONS';
export const SET_INTERVAL_ID = "SET_INTERVAL_ID";
export const CANCEL = 'CANCEL';
export const FETCHED_NEW_POSITIONS= 'FETCHED_NEW_POSITIONS';
export const REQUEST_MODAL_TEAM = 'REQUEST_MODAL_TEAM';
export const START_GAME = 'START_GAME';
export const ERROR_START = 'ERROR_START';
export const FETCHING_START= 'FETCHING_START';
export const START_FETCHED = 'START_FETCHED';
export const TEAMS_FETCHED = 'TEAMS_FETCHED___';

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_GAMEMASTER_SIDE_MENU_OPENED,
        isOpen: isOpen
    }
};

export const forceRefresh = () => {
    return{
        type: FORCE_REFRESH
    }
};

export const setContinuousRefresh = (value) => {
    return{
        type: SET_CONTINUOUS_REFRESH,
        value: value
    }
};

export const cancel = () => {
    return{
        type:CANCEL
    }
};

export const updatePositions = () => {
    return dispatch => {

        if(!store.getState().gameMasterScreenReducer.continuousRefresh){
            dispatch(cancel());
        }
        else {
            console.log("positions updated!");
            let gameCode = store.getState().joinGameReducer.gameCode;
            dispatch(fetchingNewPositions());
            fetch("https://hikong.masi-henallux.be:5000/" + gameCode + "/getTeamsStats")
                .then(function(response) {
                    return response.json();
                })
                .then(function(teams) {
                    dispatch(newPositionsFetched(teams))
            });
        }
    }
};

export const fetchingNewPositions = () => {
    return{
        type: FETCHING_NEW_POSITIONS,
    }
};

export const newPositionsFetched = (teams) => {
    return{
        type: FETCHED_NEW_POSITIONS,
        teams: teams,
    }
};


export const retrieveTeams = () => {
    return dispatch =>{
        let gameCode = store.getState().joinGameReducer.gameCode;
        fetch("https://hikong.masi-henallux.be:5000/" + gameCode + "/getTeamsStats")
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                return {
                    hasError: true
                }
            })
            .then((json) => {
                if(!json.hasError){
                    dispatch(teamsFetched(json));
                }
            });
        dispatch(fetchingTeams());
    }
};

export const teamsFetched = (teams) => {
    return{
        type:TEAMS_FETCHED,
        teams:teams
    }
};

export const startGame = () => {
    return dispatch => {
        let gameCode = store.getState().joinGameReducer.gameCode;
        fetch("https://hikong.masi-henallux.be:5000/" + gameCode +"/BattleReady")
            .then((response) => {
                if(response.ok){
                    dispatch(startFetched());
                    dispatch(retrieveTeams());
                }
                else {
                    dispatch(errorStart("An error has occured, please try again later"));
                }
            });
        dispatch(fetchingStart());
    }
};

export const fetchingStart = () => {
    return{
        type: FETCHING_START
    }
};

export const startFetched = () => {
    return{
        type: START_FETCHED
    }
};

export const errorStart = (message) => {
    return{
        type: ERROR_START,
        message: message
    }
};

export const onRequestModal = (team) => {
    return{
        type:REQUEST_MODAL_TEAM,
        team: team,
    }
};