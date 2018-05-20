import {FORCE_REFRESH,SET_CONTINUOUS_REFRESH,CHANGE_GAMEMASTER_SIDE_MENU_OPENED} from "../actions/actionsGameMasterScreen";

let dataState = {
    sideMenuOpened: false,
    centerRegion:{
        latitude:  50.223777,
        longitude: 5.335017,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    },
    continuousRefresh: true
};

export default function gameMasterScreenReducer (state = dataState, action) {
    switch (action.type) {

        default:
            return state;
    }
};