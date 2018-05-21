import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import store from '../config/store'
import {getGameTeams, isCodePlayer} from "../config/FakeServer";
import RecapitulativeScreen from "../screens/RecapitulativeScreen";
import {prepareRequest} from "../utils/constants";
import FCM, {FCMEvent} from "react-native-fcm";

export const SUBMIT = 'SUBMIT';
export const SET_PLAYER_NAME= 'SET_PLAYER_NAME';
export const PLAYER_STATUS_FETCHED = 'PLAYER_STATUS_FETCHED';
export const ERROR_WITH_INPUT= 'ERROR_WITH_INPUT';
export const SET_GAME_CODE ='SET_GAME_CODE';
export const FETCH_PLAYER_STATUS = 'FETCH_PLAYER_STATUS';
export const INPUT_CODE = 'INPUT_CODE';
export const JOIN_TEAM = 'JOIN_TEAM';
export const TOGGLE_GAME_READY = 'TOGGLE_GAME_READY';
export const FETCHING_TEAMS = 'FETCHING_TEAMS';
export const TEAMS_FETCHED = 'TEAMS_FETCHED';
export const FETCH_TEAMS = 'FETCH_TEAMS';

export const submit = () =>{
    return dispatch => {
        let params = {
            code: store.getState().joinGameReducer.gameCode
        };
        let request = prepareRequest(params,"POST");
        fetch('https://hikong.masi-henallux.be:5000/joingame',request)
            .then ((response) => {
                if(response.ok){
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }

            })
            .then ((json) => {
                if(json.hasError){
                    dispatch(errorWithInput());
                }
                else
                {
                    if(json.admin){
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"GameMasterScreen"
                        }));
                    }
                    else {
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"TeamSelectionScreen"
                        }));
                    }
                }

            })
            .catch((error) => {
                console.error("Error  : " + error);
            });

        dispatch(fetchPlayerStatus());
    };
};

export const errorWithInput = () => {
    return{
        type: ERROR_WITH_INPUT
    }
};

export const playerStatusFetched = (value) => {
    return{
        type:PLAYER_STATUS_FETCHED,
        status: value
    }
};

export const setPlayerName = (value) =>{
    return{
        type:SET_PLAYER_NAME,
        playerName: value,
    }
};

export const fetchPlayerStatus = () => {
    return{
        type:FETCH_PLAYER_STATUS,
    }
};

export const setGameCode = (value) => {
    return{
        type:SET_GAME_CODE,
        gameCode: value,
    }
};

export const inputCode = (gameCode,playerName) =>{
    return{
        type:INPUT_CODE,
        gameCode:gameCode,
        playerName:playerName
    }
};

export const joinTeam = (teamName) =>{
    return (dispatch) => {
        FCM.getFCMToken().then((token) => {
            console.log(token);
            let params = {
                playercode: store.getState().joinGameReducer.gameCode,
                pseudonyme: store.getState().joinGameReducer.playerName,
                token: token,
                name: teamName,
                latitude:  50.223777, //TODO set from geolocation
                longitude: 5.335017,  //TODO set from geolocation
            };
            console.log(params);
            let request = prepareRequest(params,"POST");
            fetch('https://hikong.masi-henallux.be:5000/jointeam',request)
                .then ((response) => {
                    console.log(response);
                    if(response.ok){
                        console.log("To me it was OKK");
                        return response.json()
                    }
                    else {
                        return {
                            hasError: true
                        }
                    }
                })
                .then ((json) => {
                    if(!json.hasError){
                        console.log("navigate !");
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"GameNotStartedScreen"
                        }));
                    }
                })

        });
        dispatch(joinGameContd(teamName));
    }
};

export const fetchTeams = () => {
    return (dispatch) => {
        dispatch(fetchingTeams());
        let gameCode = store.getState().joinGameReducer.gameCode;
        fetch("https://hikong.masi-henallux.be:5000/" + gameCode + "/teams")
            .then((response) => response.json())
            .then((json) => {
                dispatch(teamsFetched(json))
            })
    }
};

export const fetchingTeams = () => {
    return{
        type: FETCHING_TEAMS,
    }
};

export const teamsFetched = (teams) => {
    return{
        type: TEAMS_FETCHED,
        teams: teams,
    }
};

export const joinGameContd = (team) => {
    return{
        type:JOIN_TEAM,
        teamName:team,
    }
};
export const toggleGameReady = () =>{
    return{
        type:TOGGLE_GAME_READY
    }
};

