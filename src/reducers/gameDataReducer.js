import {
    STORE_SERVER_DATA, STORE_NEXT_BEACON, STORE_CURRENT_LOCATION, SET_MAP_VIEW_VISIBLE,
    STORE_BEARING, PLAYER_INSIDE_BEACON, RIDDLE_SOLVING_CLOSE_MODAL, RIDDLE_SOLVING_REQUEST_MODAL, SET_CURRENT_ANSWER,
    CONFIRM_RIDDLE_SOLVING, storeNextBeacon, RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED, STORE_END_GAME_STATS
} from '../actions/actionsGameData';
import {getNextBeacon2} from "../config/FakeServer";

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
        riddleStatement: "Mon coup n'est pas fatal mais je fais parfois mal souvent je suis dresse et je sens bon la maree, qui suis je ?",
        riddleAnswer: "Ma bite",
        lastBeacon: false
    },
    currentLocation: {
        latitude: 0.0,
        longitude: 0.0,
        altitude: 0,
        heading: 0,
            //Returns a double representing the direction in which the device is traveling.
            // This value, specified in degrees, indicates how far off from heading true north the device is.
            // 0 degrees represents true north, and the direction is determined clockwise (which means that east
            // is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN.
            // If the device is unable to provide heading information, this value is null.
        speed: 0,
        accuracy: 0.0,
        error: null,
    },
    mapViewVisible: false,
    bearing: 0,
    isPlayerInsideBeacon: false,
    modalVisible: false,
    currentAnswer: "",
    correctAnswer: false,
    isSubmitButtonPressed: false,
    gameStats: {
        time: "0:00",
        score: 0,
        position: 99,
        totalTeams: 99
    }
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
                    lastBeacon: action.lastBeacon
                }
            };
        case STORE_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: {
                    latitude: action.latitude,
                    longitude: action.longitude,
                    altitude: action.altitude,
                    heading: action.heading,
                    speed: action.speed,
                    accuracy: action.accuracy,
                    error: action.error,
                }
            };
        case SET_MAP_VIEW_VISIBLE:
            return {
                ...state,
                mapViewVisible: action.mapViewVisible
            };
        case STORE_BEARING:
            return {
                ...state,
                bearing: action.bearing
            };
        case PLAYER_INSIDE_BEACON:
            return {
                ...state,
                isPlayerInsideBeacon: action.isPlayerInsideBeacon
            };
        case RIDDLE_SOLVING_CLOSE_MODAL:
            return{
                ...state,
                modalVisible: false,
            };
        case RIDDLE_SOLVING_REQUEST_MODAL:
            return{
                ...state,
                modalVisible: true,
            };
        case SET_CURRENT_ANSWER:
            return{
                ...state,
                currentAnswer: action.currentAnswer,
                isSubmitButtonPressed: action.isSubmitButtonPressed
            };
        case CONFIRM_RIDDLE_SOLVING:
            return{
                ...state,
                correctAnswer: action.correctAnswer,
                modalVisible: action.modalVisible,
                currentAnswer: action.currentAnswer
            };
        case RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED:
            return{
                ...state,
                isSubmitButtonPressed: action.isSubmitButtonPressed
            };
        case STORE_END_GAME_STATS:
            return {
                ...state,
                gameStats: {
                    time: action.time,
                    score: action.score,
                    position: action.position,
                    totalTeams: action.totalTeams,
                }
            };
        default:
            return state;
    }
};