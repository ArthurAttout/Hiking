import {
    STORE_SERVER_DATA, STORE_NEXT_BEACON, STORE_CURRENT_LOCATION, SET_MAP_VIEW_VISIBLE,
    STORE_BEARING, PLAYER_INSIDE_BEACON, RIDDLE_SOLVING_CLOSE_MODAL, RIDDLE_SOLVING_REQUEST_MODAL, SET_CURRENT_ANSWER,
    CONFIRM_RIDDLE_SOLVING, RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED, STORE_END_GAME_STATS,
    STORE_TEAM_INFO, DECREMENT_TEAM_LIVE, SHRINK_ZONE, CENTER_REGION_CHANGED, STORE_TIMER_IDS
} from '../actions/actionsGameData';

let dataState = {
    admin: false,
    game: {
        Settings_idSettings: null,
        idGame: null,
        name: "",
        GameMode: null,
        isStarted: false,
        PlayerCode: "",
        GameMasterCode: ""
    },
    settings: {
        timerRiddle: null,
        tresholdShrink: null,
        idSettings: null,
        center_x: null,     // latitude
        center_y: null,     //longitude
        lives: 0,
        radius: null,
        enableNextBeaconVisibility: false,
        mapViewEnable: false
    },
    teamInfo: {
        name: "",
        ColorHex: "#000000",
        Game_idGame: 0,
        Checkpoint: 0,
        iconUrl: null,
        score: 0,
        lives: 0,
        idTeam: 0
    },
    nextBeacon: {
        name: "",
        iconURL: null,
        latitude: null,
        longitude: null,
        statement: "Mon coup n'est pas fatal mais je fais parfois mal souvent je suis dresse et je sens bon la maree, qui suis je ?",
        answer: "Ma bite",
        lastBeacon:false
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
        classement: 99,
        totalTeams: 99
    },
    centerRegion: null,
    ids: {
        watchId: null,
        shrinkIntervalID: null,
        refreshIntervalID: null
    }
};

export default function gameDataReducer (state = dataState, action) {
    switch (action.type) {
        case STORE_SERVER_DATA:
            return {
                ...state,
                admin: action.admin,
                game: action.game,
                settings: action.settings
            };
        case STORE_NEXT_BEACON:
            return {
                ...state,
                nextBeacon: {
                    name: action.name,
                    iconURL: action.iconURL,
                    latitude: action.latitude,
                    longitude: action.longitude,
                    statement: action.statement,
                    answer: action.answer,
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
                currentAnswer: action.currentAnswer,
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
                    classement: action.classement,
                    totalTeams: action.totalTeams,
                    score: action.score,
                    time: action.time
                }
            };
        case STORE_TEAM_INFO:
            return{
                ...state,
                teamInfo: action.teamInfo
            };
        case DECREMENT_TEAM_LIVE:
            return {
                ...state,
                teamInfo: {
                    ...state.teamInfo,
                    lives: action.teamLives
                }
            };
        case SHRINK_ZONE:
            return{
                ...state,
                settings: {
                    ...state.settings,
                    radius: action.shrinkZoneRadius
                }
            };
        case CENTER_REGION_CHANGED:
            return {
                ...state,
                centerRegion: action.newRegion
            };
        case STORE_TIMER_IDS:
            return {
                ...state,
                ids: action.ids
            };
        default:
            return state;
    }
};