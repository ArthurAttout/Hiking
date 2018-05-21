import {
    SUBMIT, JOIN_TEAM, TOGGLE_GAME_READY, SET_GAME_CODE, SET_PLAYER_NAME,
    FETCH_PLAYER_STATUS, PLAYER_STATUS_FETCHED, FETCH_TEAMS
} from '../actions/actionsJoinGame';

let dataState = {
    gameReady: false,
    gameCode: 'GM',
    playerName: 'JohnDoe',
    teamName: 'AtBoLo',
    teamId: 0,
    showProgressStatus: false,
    isGameMaster: false,
    teamsList: [
        {
            title: "",
            ColorHex: "#7d7682",
            iconUrl: null,
            idTeam: null,
        },
        ]
};

export default function joinGameReducer (state = dataState, action) {
    switch (action.type) {
        case SUBMIT:
            return {
                ...state,
                gameCode:action.gameCode,
                playerName:action.playerName,
                isGameMaster:action.isGameMaster,
            };
        case JOIN_TEAM:
            return {
                ...state,
                teamName:action.teamName,
                teamId: action.teamId
            };
        case TOGGLE_GAME_READY:
            return {
                ...state,
                gameReady:true
            };
        case SET_PLAYER_NAME:
            return{
                ...state,
                playerName: action.playerName
            };

        case SET_GAME_CODE:
            return{
                ...state,
                gameCode: action.gameCode,
            };

        case FETCH_PLAYER_STATUS:
            console.log(state.playerName);
            console.log(state.gameCode);
            return{
                ...state,
                showProgressStatus: true
            };

        case PLAYER_STATUS_FETCHED:
            return{
                ...state,
                playerStatus: action.status,
                showProgressStatus: false,
            };
        case FETCH_TEAMS:
            return{
                ...state,
                teamsList: action.teamsList
            };
        default:
            return state;
    }
};