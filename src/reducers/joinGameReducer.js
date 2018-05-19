import { SUBMIT, JOIN_TEAM, TOGGLE_GAME_READY,SET_GAME_CODE,SET_PLAYER_NAME,
    FETCH_PLAYER_STATUS,PLAYER_STATUS_FETCHED} from '../actions/actionsJoinGame';

let dataState = {
    gameReady: false,
    gameCode: 'ABCD',
    playerName: 'JohnDoe',
    teamName: 'AtBoLo',
    showProgressStatus: false,
    isGameMaster: false,
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
                teamName:action.teamName
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
            return{
                ...state,
                showProgressStatus: true
            };

        case PLAYER_STATUS_FETCHED:
            return{
                ...state,
                playerStatus: action.status
            };
        default:
            return state;
    }
};