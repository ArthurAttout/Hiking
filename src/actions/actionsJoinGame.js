import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import store from '../config/store'
export const SUBMIT = 'SUBMIT';
export const JOIN_TEAM = 'JOIN_TEAM';
export const TOGGLE_GAME_READY = 'TOGGLE_GAME_READY';
export const SET_PLAYER_NAME= 'SET_PLAYER_NAME';
export const PLAYER_STATUS_FETCHED = 'PLAYER_STATUS_FETCHED';
export const SET_GAME_CODE ='SET_GAME_CODE';
export const FETCH_PLAYER_STATUS = 'FETCH_PLAYER_STATUS';

export const submit = () =>{
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
        setTimeout(function(){
            if(store.getState().joinGameReducer.isGameMaster){
                navigatorRef.dispatch(NavigationActions.reset({ // this is react-navigation's dispatch
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'GameScreen'})],
                }));
            }
            else {
                navigatorRef.dispatch(NavigationActions.reset({ // this is react-navigation's dispatch
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'GameScreen'})],
                }));
            }
        }, 5000);
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

export const joinTeam = (team) =>{
    return{
        type:JOIN_TEAM,
        teamName:team
    }
};

export const toggleGameReady = () =>{
    return{
        type:TOGGLE_GAME_READY
    }
};