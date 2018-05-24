import {
    FORCE_REFRESH, SET_CONTINUOUS_REFRESH, CHANGE_GAMEMASTER_SIDE_MENU_OPENED,REQUEST_MODAL_TEAM,
    FETCHED_NEW_POSITIONS, FETCHING_NEW_POSITIONS, SET_INTERVAL_ID, UPDATE_POSITIONS, START_GAME,
    ERROR_START,FETCHING_START,START_FETCHED
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
        {
            id:"a",
            name:'Team Alpha',
            color:"#4c00f0",
            coordinate:{
                latitude:  50.223867,
                longitude: 5.334017,
            }
        },
        {
            id:"b",
            name:'Team Beta',
            color:"#f03500",
            coordinate:{
                latitude:  50.223687,
                longitude: 5.335317,
            }
        },
        {
            id:"c",
            name:'Team Gamma',
            color:"#00f047",
            coordinate:{
                latitude:  50.223777,
                longitude: 5.336017,
            }
        }
    ],
    continuousRefresh: true
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


        case FETCHED_NEW_POSITIONS:
            return{
                ...state,
                teams: action.newPositions,
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