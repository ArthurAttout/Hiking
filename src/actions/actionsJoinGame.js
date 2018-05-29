import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import store from '../config/store'
import {prepareRequest} from "../utils/constants";
import FCM, {FCMEvent} from "react-native-fcm";
import {getNextBeaconNoConfirm, resetTimer, storeNextBeacon, storeServerData, storeTeamInfo} from "./actionsGameData";
import {ToastAndroid} from "react-native";

export const SUBMIT = 'SUBMIT';
export const SET_PLAYER_NAME= 'SET_PLAYER_NAME';
export const PLAYER_STATUS_FETCHED = 'PLAYER_STATUS_FETCHED';
export const ERROR_WITH_INPUT= 'ERROR_WITH_INPUT';
export const SET_GAME_CODE ='SET_GAME_CODE';
export const FETCH_PLAYER_STATUS = 'FETCH_PLAYER_STATUS';
export const SET_IS_GAME_STARTED = 'SET_IS_GAME_STARTED';
export const SET_TEAM_NAME= 'SET_TEAM_NAME';
export const INPUT_CODE = 'INPUT_CODE';
export const JOIN_TEAM = 'JOIN_TEAM';
export const TOGGLE_GAME_READY = 'TOGGLE_GAME_READY';
export const FETCHING_TEAMS = 'FETCHING_TEAMS';
export const TEAMS_FETCHED = 'TEAMS_FETCHED';
export const FETCH_TEAMS = 'FETCH_TEAMS';

export const setTeamName = (teamName) => {
    return{
        type: SET_TEAM_NAME,
        teamName: teamName,
    }
};

export const submit = () =>{
    return dispatch => {
        dispatch(fetchPlayerStatus());
        let params = {
            code: store.getState().joinGameReducer.gameCode
        };
        let request = prepareRequest(params,"POST");
        fetch('https://hikong.masi-henallux.be:5000/joingame',request)
            .then ((response) => {
                if(response.status && response.ok){
                    return response.json()
                }
                else {
                    if(response.status === 403) {
                        if (response.text() === "code invalide")
                            ToastAndroid.show('The code entered is invalid...', ToastAndroid.LONG);
                    }
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
                    dispatch(storeServerData(json));
                    dispatch(resetTimer());
                    if(json.admin){
                        dispatch(setIsGameStarted(json.game.isStarted));
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"GameMasterScreen",
                        }));
                    }
                    else {
                        dispatch(playerStatusFetched(""));
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"TeamSelectionScreen"
                        }));
                    }
                }

            })
            .catch((error) => {
                console.error("Error  : " + error);
            });
    };
};

export const errorWithInput = () => {
    return{
        type: ERROR_WITH_INPUT
    }
};

export const setIsGameStarted = (value) => {
    return{
        type: SET_IS_GAME_STARTED,
        isStarted: value
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

export const joinTeam = (teamName, teamId) =>{
    return (dispatch) => {
        dispatch(setTeamName(teamName));

        let latitude = store.getState().gameDataReducer.currentLocation.latitude;
        let longitude = store.getState().gameDataReducer.currentLocation.longitude;

        FCM.getFCMToken().then((token) => {
            let params = {
                playercode: store.getState().joinGameReducer.gameCode,
                pseudonyme: store.getState().joinGameReducer.playerName,
                token: token,
                name: teamName,
                latitude:  latitude === undefined ? 50.224107 : longitude,
                longitude: longitude === undefined ? 5.339308 : longitude
            };

            let request = prepareRequest(params,"POST");
            console.log(params);

            fetch('https://hikong.masi-henallux.be:5000/jointeam',request)
                .then ((response) => {
                    if(response.status === 200 && response.ok){
                        return response.json()
                    }
                    else {
                        if(response.status === 403) {
                            if (response.text() === "PSEUDO_TAKEN") {
                                ToastAndroid.show('The username entered is already taken...', ToastAndroid.LONG);
                            } else if (response.text() === "TEAM_INVALID") {
                                ToastAndroid.show('The requested team does not exist...', ToastAndroid.LONG);
                            } else if (response.text() === "GAME_DOESNT_EXIST") {
                                ToastAndroid.show('The game does not exist...', ToastAndroid.LONG);
                            }
                        }
                        console.log(response);
                        return {
                            hasError: true
                        }
                    }
                })
                .then ((json) => {
                    if(!json.hasError) {
                        // check if game has started
                        if (store.getState().gameDataReducer.game.isStarted) {
                            // check if the first checkpoint must be fetched
                            if(store.getState().gameDataReducer.teamInfo.Checkpoint === 0){
                                // get first point
                                let params = {
                                    nameTeam: store.getState().joinGameReducer.teamName,
                                    playercode: store.getState().gameDataReducer.game.PlayerCode
                                };
                                let request = prepareRequest(params,"POST");
                                fetch('https://hikong.masi-henallux.be:5000/firstpoint',request)
                                    .then ((response) => {
                                        if(response.status === 200){
                                            return response.json()
                                        }
                                        else {
                                            return {
                                                hasError: true
                                            }
                                        }
                                    })
                                    .then ((json) => {
                                        if(!json.hasError) {
                                            dispatch(storeNextBeacon(json));
                                        }
                                    })
                            } else {
                                // get next checkpoint
                                dispatch(getNextBeacon())
                            }
                            navigatorRef.dispatch(NavigationActions.navigate({
                                routeName: "GameScreen"
                            }));
                        } else {
                            navigatorRef.dispatch(NavigationActions.navigate({
                                routeName: "GameNotStartedScreen"
                            }));
                        }
                    } else {
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName: "JoinGameScreen"
                        }));
                    }
                })

        });
        dispatch(joinGameContd(teamName, teamId));
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

export const joinGameContd = (teamName, teamId) => {
    store.dispatch(storeTeamInfo(teamId));
    return{
        type:JOIN_TEAM,
        teamName:teamName,
        teamId:teamId
    }
};
export const toggleGameReady = () =>{
    return{
        type:TOGGLE_GAME_READY
    }
};

