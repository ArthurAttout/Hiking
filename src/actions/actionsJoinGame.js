import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import store from '../config/store'
import {getGameTeams, isCodePlayer} from "../config/FakeServer";

export const SUBMIT = 'SUBMIT';
export const SET_PLAYER_NAME= 'SET_PLAYER_NAME';
export const PLAYER_STATUS_FETCHED = 'PLAYER_STATUS_FETCHED';
export const SET_GAME_CODE ='SET_GAME_CODE';
export const FETCH_PLAYER_STATUS = 'FETCH_PLAYER_STATUS';
export const INPUT_CODE = 'INPUT_CODE';
export const JOIN_TEAM = 'JOIN_TEAM';
export const TOGGLE_GAME_READY = 'TOGGLE_GAME_READY';
export const FETCH_TEAMS = 'FETCH_TEAMS';

export const submit = (navigator) =>{
    return dispatch => {
        /*
        let url = "https://hikong.masi-henallux.be:5000/joinGame";
        let params = {
            gameCode : store.getState().joinGameReducer.gameCode,
            playerName : store.getState().joinGameReducer.playerName,
        };
        let request = this.prepareRequest(params,"POST");

        fetch('https://hikong.masi-henallux.be:5000/game',request)
            .then ((response) => response.json())
            .then ((json) => {
                const { navigate } = this.props.navigation;
                navigate('GameCreatedScreen',json);
            })
            .catch((error) => {
                console.error("Error  : " + error);
            });*/

        // TODO get team list from server
        const teamsList = getGameTeams(store.getState().joinGameReducer.gameCode);
        store.dispatch(fetchTeams(teamsList));

        setTimeout(function(){
            dispatch(playerStatusFetched(true));
            if(isCodePlayer(store.getState().joinGameReducer.gameCode)){
                navigatorRef.dispatch(NavigationActions.navigate({
                    routeName:"TeamSelectionScreen"
                }));
            }
            else {
                navigatorRef.dispatch(NavigationActions.navigate({
                    routeName:"GameMasterScreen"
                }));
            }
        }, 100);
        dispatch(fetchPlayerStatus());
    };
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
        playername: value,
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

export function fetchTeams(teamsList){
    return {
        type: FETCH_TEAMS,
        teamsList: teamsList
    }

}

export function getGameModes(){
    return (dispatch) => {
        setTimeout(() => {
            const data  = [
                {"title":"Team 1"},
                {"title":"Team 2"},
                {"title":"Team 3"},
                {"title":"Team 4"},
                {"title":"Team 5"},
                {"title":"Team 6"},
                {"title":"Team 7"},
                {"title":"Team 8"},
                {"title":"Team 9"},
                {"title":"Team 10"},
                {"title":"Team 11"},
                {"title":"Team 12"}
            ]
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);
    };
}

export const inputCode = (gameCode,playerName) =>{
    return{
        type:INPUT_CODE,
        gameCode:gameCode,
        playerName:playerName
    }
};

export const joinTeam = (team, teamId) =>{
    return{
        type:JOIN_TEAM,
        teamName:team,
        teamId: teamId
    }
};

export const toggleGameReady = () =>{
    return{
        type:TOGGLE_GAME_READY
    }
};

