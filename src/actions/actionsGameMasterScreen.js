
import store from '../config/store'
import {fetchingTeams} from "./actionsJoinGame";
import {prepareRequest} from "../utils/constants";
export const FORCE_REFRESH= 'FORCE_REFRESH';
export const SHOW_TEAM_BEACONS = 'SHOW_TEAM_BEACONS';
export const CHANGE_GAMEMASTER_SIDE_MENU_OPENED = 'CHANGE_GAMEMASTER_SIDE_MENU_OPENED';
export const SET_CONTINUOUS_REFRESH = 'SET_CONTINUOUS_REFRESH';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';
export const FETCHING_NEW_POSITIONS  = 'FETCHING_NEW_POSITIONS';
export const FETCHING_SENDING_MESSAGE= 'FETCHING_SENDING_MESSAGE';
export const SET_INTERVAL_ID = "SET_INTERVAL_ID";
export const CANCEL = 'CANCEL';
export const FETCHED_NEW_POSITIONS= 'FETCHED_NEW_POSITIONS';
export const MESSAGE_SENDING_FAILED = 'MESSAGE_SENDING_FAILED';
export const SET_MESSAGE_BODY = 'SET_MESSAGE_BODY';
export const REQUEST_MODAL_TEAM = 'REQUEST_MODAL_TEAM';
export const START_GAME = 'START_GAME';
export const ERROR_START = 'ERROR_START';
export const SHOW_MESSAGING_MODAL = 'SHOW_MESSAGING_MODAL';
export const SET_MESSAGE_TITLE = 'SET_MESSAGE_TITLE';
export const FETCHING_START= 'FETCHING_START';
export const START_FETCHED = 'START_FETCHED';
export const CLOSE_TEAM_MESSAGING_MODAL = 'CLOSE_TEAM_MESSAGING_MODAL';
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
            //fetch("http://www.mocky.io/v2/5b0d291631000056009d5552")
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

export const newPositionsFetched = (json) => {
    return{
        type: FETCHED_NEW_POSITIONS,
        teams: json.teams,
    }
};


export const retrieveTeams = () => {
    return dispatch =>{
        let gameCode = store.getState().joinGameReducer.gameCode;
        fetch("https://hikong.masi-henallux.be:5000/" + gameCode + "/getTeamsStats")
        //fetch("http://www.mocky.io/v2/5b0d291631000056009d5552")
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
                    console.log("Received json : ");
                    console.log(json);
                    dispatch(teamsFetched(json));
                }
            });
        dispatch(fetchingTeams());
    }
};

export const teamsFetched = (json) => {
    console.log("Fetched teams. Size : " + json.teams.length);
    return{
        type:TEAMS_FETCHED,
        teams:json.teams
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

export const closeTeamMessagingModal = () =>{
    return{
        type: CLOSE_TEAM_MESSAGING_MODAL
    }
};

export const showTeamMessagingModal = (teamDestination) =>{
    return{
        type: SHOW_MESSAGING_MODAL,
        teamDestination: teamDestination
    }
};

export const setMessageTitle = (title) => {
    return{
        type: SET_MESSAGE_TITLE,
        title: title,
    }
};

export const onShowTeamBeacons = (team) => {
    return{
        type: SHOW_TEAM_BEACONS,
        team: team
    }
};

export const setMessageBody = (body) => {
    return{
        type: SET_MESSAGE_BODY,
        body: body,
    }
};

export const sendMessage = () => {
    return dispatch =>{
        let params = {
            code:store.getState().joinGameReducer.gameCode,
            nameTeam:store.getState().gameMasterScreenReducer.teamDestination.name,
            message:{
                title:store.getState().gameMasterScreenReducer.messageTitle,
                body:store.getState().gameMasterScreenReducer.messageBody
            }
        };
        console.log(params);
        let request = prepareRequest(params,"POST");
        fetch("https://hikong.masi-henallux.be:5000/message",request)
            .then((response)=>{
                if(response.ok){
                    dispatch(closeTeamMessagingModal());
                }
                else
                {
                    dispatch(messageSendingFailed(""));
                }
            });
        dispatch(fetchingSendingMessage());
    }
};

export const fetchingSendingMessage = () =>{
    return{
        type: FETCHING_SENDING_MESSAGE
    }
};

export const messageSendingFailed = (error) => {
    return{
        type: MESSAGE_SENDING_FAILED,
        errorMessaging : error,
    }
};