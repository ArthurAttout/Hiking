import {FORCE_REFRESH,SET_CONTINUOUS_REFRESH,CHANGE_GAMEMASTER_SIDE_MENU_OPENED,
FETCHED_NEW_POSITIONS,FETCHING_NEW_POSITIONS,SET_INTERVAL_ID,UPDATE_POSITIONS} from "../actions/actionsGameMasterScreen";

let dataState = {
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
            color:"#4c00f0",
            coordinate:{
                latitude:  50.223867,
                longitude: 5.334017,
            }
        },
        {
            id:"b",
            color:"#f03500",
            coordinate:{
                latitude:  50.223687,
                longitude: 5.335317,
            }
        },
        {
            id:"c",
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
                sideMenuOpened: true,
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

        default:
            return state;
    }
};