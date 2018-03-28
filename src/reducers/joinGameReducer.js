import { INPUT_CODE, JOIN_TEAM, TOGGLE_GAME_READY } from '../actions/actionsJoinGame';

let dataState = {
    gameReady: false,
    gameCode: 'ABCD',
    playerName: 'JohnDoe',
    teamName: 'AtBoLo'
};

export default function gameModesReducer (state = dataState, action) {
    switch (action.type) {
        case INPUT_CODE:
            return {
                ...state,
                gameCode:action.gameCode,
                playerName:action.playerName
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
        default:
            return state;
    }
};