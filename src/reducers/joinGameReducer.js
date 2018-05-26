import {
    SUBMIT, JOIN_TEAM, TOGGLE_GAME_READY, SET_GAME_CODE, SET_PLAYER_NAME,
    FETCH_PLAYER_STATUS, PLAYER_STATUS_FETCHED, FETCH_TEAMS,FETCHING_TEAMS,
    TEAMS_FETCHED,ERROR_WITH_INPUT, SET_TEAM_NAME
} from '../actions/actionsJoinGame';

import {ToastAndroid} from 'react-native'

let dataState = {
    gameReady: false,
    gameCode: '',
    playerName: '',
    teamName: 'AtBoLo',
    teamId: 0,
    showProgressStatus: false,
    isGameMaster: false,
    teamsList: [
        {
            Checkpoint: 0,
            ColorHex: '#ffffff',
            Game_idGame: 1,
            iconUrl: null,
            idTeam: 1,
            lives: 0,
            name: 'Hhjj',
            score: 0
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

        case SET_TEAM_NAME:
            return{
                ...state,
                teamName: action.teamName,
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
            ToastAndroid.show('This game does not seem to exist ...',ToastAndroid.LONG);
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
                        Checkpoint: team.Checkpoint,
                        ColorHex: team.ColorHex,
                        Game_idGame: team.Game_idGame,
                        iconUrl: team.iconUrl,
                        idTeam: team.idTeam,
                        lives: team.lives,
                        name: team.name,
                        score: team.score
                    }
                })
            };
        default:
            return state;
    }
};