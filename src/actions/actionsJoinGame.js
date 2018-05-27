import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import store from '../config/store'
import {getGameTeams, isCodePlayer} from "../config/FakeServer";
import RecapitulativeScreen from "../screens/RecapitulativeScreen";
import {prepareRequest} from "../utils/constants";
import FCM, {FCMEvent} from "react-native-fcm";
import {getNextBeaconNoConfirm, storeNextBeacon, storeServerData} from "./actionsGameData";

export const SUBMIT = 'SUBMIT';
export const SET_PLAYER_NAME= 'SET_PLAYER_NAME';
export const PLAYER_STATUS_FETCHED = 'PLAYER_STATUS_FETCHED';
export const ERROR_WITH_INPUT= 'ERROR_WITH_INPUT';
export const SET_GAME_CODE ='SET_GAME_CODE';
export const FETCH_PLAYER_STATUS = 'FETCH_PLAYER_STATUS';
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
                    dispatch(storeServerData(json));
                    console.log("Game Data");
                    console.log("isAdmin");
                    console.log(store.getState().gameDataReducer.admin);
                    console.log("Game");
                    console.log(store.getState().gameDataReducer.game);
                    console.log("Settings");
                    console.log(store.getState().gameDataReducer.settings);
                    if(json.admin){
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName:"GameMasterScreen",
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
        dispatch(setTeamName(teamName));
        FCM.getFCMToken().then((token) => {
            let params = {
                playercode: store.getState().joinGameReducer.gameCode,
                pseudonyme: store.getState().joinGameReducer.playerName,
                token: token,
                name: teamName,
                // TODO gerer le cas d'erreur si position non obtenue
                latitude:  store.getState().gameDataReducer.currentLocation.latitude,
                longitude: store.getState().gameDataReducer.currentLocation.longitude,
            };
            let request = prepareRequest(params,"POST");
            console.log("Joining team with /jointeam");
            console.log("Parameters");
            console.log(params);
            console.log("Request");
            console.log(request);
            fetch('https://hikong.masi-henallux.be:5000/jointeam',request)
                .then ((response) => {
                    console.log("Response :");
                    console.log(response);
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
                    if(!json.hasError) {
                        // check if gane has started
                        if (store.getState().gameDataReducer.game.isStarted) {
                            // check if the first checkpoint must be fetched
                            if(store.getState().gameDataReducer.teamInfo.Checkpoint === 0){
                                // get first point
                                let params = {
                                    namePlayer: store.getState().joinGameReducer.playerName,
                                    nameTeam: store.getState().joinGameReducer.teamName
                                };
                                let request = prepareRequest(params,"POST");
                                console.log("Requesting first beacon with /firstpoint");
                                console.log("Parameters");
                                console.log(params);
                                console.log("Request");
                                console.log(request);
                                fetch('https://hikong.masi-henallux.be:5000/firstpoint',request)
                                    .then ((response) => {
                                        console.log("Response :");
                                        console.log(response);
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
                                        if(!json.hasError) {
                                            dispatch(storeNextBeacon(json));
                                        }
                                    })
                            } else {
                                // get next checkpoint
                                // TODO determine how to get !!!!!!!!!!!!!!!!!!!!!!!!
                                console.log("First beacon to request is not the first point in track")
                                dispatch(getNextBeaconNoConfirm())
                            }
                            navigatorRef.dispatch(NavigationActions.navigate({
                                routeName: "GameScreen"
                            }));
                        } else {
                            navigatorRef.dispatch(NavigationActions.navigate({
                                routeName: "GameNotStartedScreen"
                            }));
                        }
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

