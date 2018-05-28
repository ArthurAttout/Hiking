import {
    FORCE_REFRESH, SET_CONTINUOUS_REFRESH, CHANGE_GAMEMASTER_SIDE_MENU_OPENED,REQUEST_MODAL_TEAM,
    FETCHED_NEW_POSITIONS, FETCHING_NEW_POSITIONS, SET_INTERVAL_ID, UPDATE_POSITIONS, START_GAME,
    ERROR_START,FETCHING_START,START_FETCHED,TEAMS_FETCHED
} from "../actions/actionsGameMasterScreen";

let dataState = {
    showStartButton: true,
    sideMenuOpened: false,
    centerRegion:{
        latitude:  50.223777,
        longitude: 5.335017,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    },
    teams:[

    ]
};

export default function gameMasterScreenReducer (state = dataState, action) {
    switch (action.type) {

        case CHANGE_GAMEMASTER_SIDE_MENU_OPENED:
            return{
                ...state,
                sideMenuOpened: action.isOpen,
            };

        case FETCHING_NEW_POSITIONS:
            return{
                ...state,
                showProgressStatus: true,
            };

        case TEAMS_FETCHED:
            let newss = {
                ...state,
                teams: action.teams.map((team) => {
                    let totLat = 0;
                    let totLong = 0;
                    team.players.forEach((player) => totLat += player.latitude);
                    team.players.forEach((player) => totLong += player.longitude);

                    return{
                        ...team,
                        id: team.idTeam,
                        coordinate:{
                            latitude: totLat / team.players.length,
                            longitude: totLong /team.players.length,
                        }
                    }
                }),
                continuousRefresh: true,
            };
            console.log(newss);
            return newss;

        case FETCHED_NEW_POSITIONS:
            return{
                ...state,
                teams: action.teams.map((team) => {
                    let totLat = 0;
                    let totLong = 0;
                    team.players.forEach((player) => totLat += player.latitude);
                    team.players.forEach((player) => totLong += player.longitude);

                    return{
                        ...team,
                        id: team.idTeam,
                        coordinate:{
                            latitude: totLat / team.players.length,
                            longitude: totLong /team.players.length,
                        }
                    }
                })
            };

        case START_GAME:
            return{
                ...state,
                showStartButton: false,
            };

        case REQUEST_MODAL_TEAM:
            return{
                ...state,
            };

        case FETCHING_START:
            return{
                ...state,
                showProgressStart : true,
                showStartButton: false
            };

        case START_FETCHED:
            return {
                ...state,
                showProgressStart: false,
                showStartButton: false,
            };

        case ERROR_START:
            return{
                ...state,
                errorMessage: action.message,
                showProgressStart: false,
                showStartButton: true
            };
        default:
            return state;
    }
};