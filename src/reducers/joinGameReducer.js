import {
    SUBMIT, JOIN_TEAM, TOGGLE_GAME_READY, SET_GAME_CODE, SET_PLAYER_NAME,
    FETCH_PLAYER_STATUS, PLAYER_STATUS_FETCHED, FETCH_TEAMS,FETCHING_TEAMS,
    TEAMS_FETCHED,ERROR_WITH_INPUT
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
                playerStatus: action.status,
                showProgressStatus: false,
            };
        case FETCH_TEAMS:
            return{
                ...state,
                teamsList: action.teamsList
            };

        case FETCHING_TEAMS:
            return{
                ...state,
                showProgressStatusTeams: true,
            };

        case ERROR_WITH_INPUT:
            return{
                ...state,
                showProgressStatus: false,
            };

        case TEAMS_FETCHED:
            return{
                ...state,
                teamsList : action.teams.map((team) => {
                    return{
                        ...team,
                        title: team.name,
                    }
                })
            };
        default:
            return state;
    }
};