import { STORE_SERVER_DATA, STORE_NEXT_BEACON, STORE_CURRENT_LOCATION, SET_MAP_VIEW_VISIBLE } from '../actions/actionsGameData';

let dataState = {
    gameData: {
        gameMode: 1,
        shrinkSpeed: 0,
        mapViewEnabled: true,
        nextBeaconVisible: true,
        displayDropDistance: true,
        timerRiddle: 0,
        lives: 0,
    },
    nextBeacon: {
        id: 0,
        latitude: 0,
        longitude: 0,
        name: "NextBeacon",
        iconUrl: "",
        qrCodeId: "",
        riddleId:  0,
        riddleStatement: "Mon coup n'est pas fatal mais je fais parfois mal souvent je suis dressé et je sens bon la marée, qui suis je ?",
        riddleAnswer: "Ma bite",
    },
    currentLocation: {
        latitude: 0.0,
        longitude: 0.0,
        accuracy: 0.0,
        error: null,
    },
    mapViewVisible: false,
};

export default function gameDataReducer (state = dataState, action) {
    switch (action.type) {
        case STORE_SERVER_DATA:
            // TODO filter based on game mode
            return {
                ...state,
                gameData: {
                    gameMode: action.gameMode,
                    shrinkSpeed: action.shrinkSpeed,
                    mapViewEnabled: action.mapViewEnabled,
                    nextBeaconVisible: action.nextBeaconVisible,
                    displayDropDistance: action.displayDropDistance,
                    timerRiddle: action.timerMaxRiddle,
                    lives: action.lives,
                }
            };
        case STORE_NEXT_BEACON:
            return {
                ...state,
                nextBeacon: {
                    id: action.id,
                    latitude: action.latitude,
                    longitude: action.longitude,
                    name: action.name,
                    iconUrl: action.iconUrl,
                    qrCodeId: action.qrCodeId,
                    riddleId: action.riddleId,
                    riddleStatement: action.riddleStatement,
                    riddleAnswer: action.riddleAnswer,
                }
            };
        case STORE_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: {
                    latitude: action.latitude,
                    longitude: action.longitude,
                    accuracy: action.accuracy,
                    error: action.error,
                }
            };
        case SET_MAP_VIEW_VISIBLE:
            return {
                ...state,
                mapViewVisible: action.mapViewVisible
            };
        default:
            return state;
    }
};