import store from "../config/store";
import {calculateBearing, calculateDistance} from "../utils/geometryUtils";
import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import {GAME_MODES, GLOBAL_SETTINGS, prepareRequest} from "../utils/constants";
import {ToastAndroid} from "react-native";
import {playerStatusFetched} from "./actionsJoinGame";

export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';
export const STORE_CURRENT_LOCATION = 'STORE_CURRENT_LOCATION';
export const CANCEL_STORE_CURRENT_LOCATION = 'CANCEL_STORE_CURRENT_LOCATION';
export const SET_MAP_VIEW_VISIBLE = 'SET_MAP_VIEW_VISIBLE';
export const STORE_BEARING = 'STORE_BEARING';
export const PLAYER_INSIDE_BEACON = 'PLAYER_INSIDE_BEACON';
export const RIDDLE_SOLVING_CLOSE_MODAL = 'RIDDLE_SOLVING_CLOSE_MODAL';
export const RIDDLE_SOLVING_REQUEST_MODAL = 'RIDDLE_SOLVING_REQUEST_MODAL';
export const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
export const CONFIRM_RIDDLE_SOLVING = 'CONFIRM_RIDDLE_SOLVING';
export const RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED = 'RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED';
export const STORE_END_GAME_STATS = 'STORE_END_GAME_STATS';
export const STORE_TEAM_INFO = 'STORE_TEAM_INFO';
export const DECREMENT_TEAM_LIVE = 'DECREMENT_TEAM_LIVE';
export const SHRINK_ZONE = 'SHRINK_ZONE';
export const CENTER_REGION_CHANGED = 'CENTER_REGION_CHANGED';
export const STORE_TIMER_IDS = 'STORE_TIMER_IDS';
export const OUT_OF_ZONE_CLOSE_MODAL = 'OUT_OF_ZONE_CLOSE_MODAL';
export const OUT_OF_ZONE_REQUEST_MODAL = 'OUT_OF_ZONE_REQUEST_MODAL';
export const UPDATE_TEAM_LIVES = 'UPDATE_TEAM_LIVES';
export const SET_NEXTBEACON_FETCH_STATUS = 'SET_NEXTBEACON_FETCH_STATUS';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const RESET_TIMER ='RESET_TIMER';
export const UPDATE_OUT_OF_ZONE_TIMER = 'UPDATE_OUT_OF_ZONE_TIMER';
export const RESET_OUT_OF_ZONE_TIMER = 'RESET_OUT_OF_ZONE_TIMER';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const SET_CURRENT_LOCATION_ACQUIRED = 'SET_CURRENT_LOCATION_ACQUIRED';
export const RESET_BACKOFF_ID = 'RESET_BACKOFF_ID';
export const INCREMENT_CHECKPOINT = 'INCREMENT_CHECKPOINT';
export const RESET_CHECKPOINT = 'RESET_CHECKPOINT';
export const ON_CLOSE_SHARE = 'ON_CLOSE_SHARE';
export const ON_OPEN_SHARE = 'ON_OPEN_SHARE';
export const LOCATION_LONG_LOAD_TIME = 'LOCATION_LONG_LOAD_TIME';
export const RESET_LOCATION_LOAD_TIME = 'RESET_LOCATION_LOAD_TIME';

export const storeTeamInfo = (teamId) => {
    let teamInfo = store.getState().joinGameReducer.teamsList.find(x => (x.idTeam === teamId));
    return{
        type: STORE_TEAM_INFO,
        teamInfo: teamInfo
    }
};

export const storeServerData = (json) =>{
    return{
        type:STORE_SERVER_DATA,
        admin: json.admin,
        game: json.game,
        settings: json.settings
    }
};

export const getNextBeacon = () => {
    return (dispatch) => {
        dispatch(setNextBeaconFetchActivity(true));
        let params = {
            nameTeam: store.getState().gameDataReducer.teamInfo.name,
            namePlayer: store.getState().joinGameReducer.playerName,
            playercode: store.getState().gameDataReducer.game.PlayerCode,
            lives: store.getState().gameDataReducer.teamInfo.lives,
            nbBeacon: store.getState().gameDataReducer.currentCheckpoint
        };
        let request = prepareRequest(params, "POST");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/confirmpoint', request)
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                if (!json.hasError) {
                    dispatch(storeNextBeacon(json));
                    dispatch(incrementCheckpoint());
                    // close modal if player had it open
                    dispatch(onCloseOutOfZoneModal());
                    dispatch(onCloseRiddleSolvingModal());
                    dispatch(playerInsideBeaconTrigger(false));
                    dispatch(setNextBeaconFetchActivity(false));
                    navigatorRef.dispatch(NavigationActions.navigate({
                        routeName: "GameScreen"
                    }));
                }
            })
    }
};

export const updateTeamLives = (updatedLives) => {
    return (dispatch) => {
        if(store.getState().gameDataReducer.settings.lives !== 0 && updatedLives <= 0) {
            store.dispatch(getLastBeacon());
        } else {
            dispatch(updateTeamLivesContd(updatedLives));
        }
    }

};

export const updateTeamLivesContd = (updatedLives) => {
    return {
        type: UPDATE_TEAM_LIVES,
        lives: updatedLives
    }

};

export const getLastBeacon = () => {
    return (dispatch) => {
        let params = {
            nameTeam: store.getState().joinGameReducer.teamName,
            playercode: store.getState().gameDataReducer.game.PlayerCode
        };
        let request = prepareRequest(params, "POST");

        fetch('https://hikong.masi-henallux.be:5000/lastpoint', request)
            .then((response) => {

                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                // TODO gerer cas d'erreur
                if (!json.hasError) {
                    dispatch(storeNextBeacon(json));
                    // close any modal as a precaution
                    dispatch(onCloseRiddleSolvingModal());
                    dispatch(onCloseOutOfZoneModal());
                    navigatorRef.dispatch(NavigationActions.navigate({
                        routeName: "GameOverScreen"
                    }));
                }
            })
    }
};


export const storeNextBeacon = (nextBeacon) =>{
    return{
        type:STORE_NEXT_BEACON,
        name: nextBeacon.name,
        iconURL: nextBeacon.iconURL,
        latitude: nextBeacon.latitude,
        longitude: nextBeacon.longitude,
        statement: nextBeacon.statement,
        answer: nextBeacon.answer,
        lastBeacon: nextBeacon.lastBeacon
    }
};

export const storeCurrentLocation = (currentLocation) =>{
    if(currentLocation.latitude === undefined || currentLocation.longitude === undefined){
        return{
            type: CANCEL_STORE_CURRENT_LOCATION,
            error: currentLocation.error,
        }
    } else {
        //store.dispatch(setCurrentLocationAcquired(true));
        return {
            type: STORE_CURRENT_LOCATION,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            altitude: currentLocation.altitude,
            heading: currentLocation.heading,
            speed: currentLocation.speed,
            accuracy: currentLocation.accuracy,
            error: 0,
        }
    }
};

export const refreshPosition = () => {
    return () => {
        let params = {
            playercode: store.getState().gameDataReducer.game.PlayerCode,
            latitude: store.getState().gameDataReducer.currentLocation.latitude,
            longitude: store.getState().gameDataReducer.currentLocation.longitude,
            nameTeam: store.getState().gameDataReducer.teamInfo.name,
            namePlayer: store.getState().joinGameReducer.playerName

        };
        let request = prepareRequest(params, "PUT");
        fetch('https://hikong.masi-henallux.be:5000/refreshpos', request)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                if (!json.hasError) {
                    // if errors, do nothing, refresh will take place in the next 30 seconds
                }
            });
    }
};

export const checkPlayerInsideBeacon = () => {
    return (dispatch) => {
        // check if player is outside of the zone
        // measure distance between user location and central point and compare to radius
        let playerDistanceToCenter = calculateDistance(
            store.getState().gameDataReducer.currentLocation,
            {latitude: store.getState().gameDataReducer.settings.center_x,
                longitude: store.getState().gameDataReducer.settings.center_y});

        let playerDistanceToNextBeacon = calculateDistance(store.getState().gameDataReducer.currentLocation,
            store.getState().gameDataReducer.nextBeacon);

        if(playerDistanceToCenter > store.getState().gameDataReducer.settings.radius &&
                store.getState().gameDataReducer.gameOver !== true) {
            store.dispatch(onRequestOutOfZoneModal());
        } else if(playerDistanceToCenter < store.getState().gameDataReducer.settings.radius &&
                    store.getState().gameDataReducer.outOfZoneModalVisible === true) {
            dispatch(onCloseOutOfZoneModal());
        } else if (playerDistanceToNextBeacon < GLOBAL_SETTINGS.BEACON_RADIUS_THRESHOLD) {
            if(!store.getState().gameDataReducer.isPlayerInsideBeacon) {
                dispatch(playerInsideBeaconTrigger(true));
                console.log(store.getState().gameDataReducer.isPlayerInsideBeacon);
                if (store.getState().gameDataReducer.nextBeacon.lastBeacon === true) {
                    let params = {
                        playercode: store.getState().gameDataReducer.game.PlayerCode,
                        name: store.getState().gameDataReducer.teamInfo.name
                    };
                    let request = prepareRequest(params, "POST");

                    fetch('https://hikong.masi-henallux.be:5000/end', request)
                        .then((response) => {
                            if (response.ok) {
                                return response.json()
                            }
                            else {
                                if(response.status === 403) {
                                    if (response.text() === "TEAM_INVALID")
                                        ToastAndroid.show('The requested team does not exist...', ToastAndroid.LONG);
                                }
                                console.log(response);
                                return {
                                    hasError: true
                                }
                            }
                        })
                        .then((json) => {
                            if (!json.hasError) {
                                console.log("EndScreenShould show here");
                                dispatch(storeEndGameStats(json));
                                navigatorRef.dispatch(NavigationActions.navigate({
                                    routeName: "EndGameScreen"
                                }));
                            }
                        });
                } else {
                    navigatorRef.dispatch(NavigationActions.navigate({
                        routeName: "BeaconScreen"
                    }));
                }
            } else {
                console.log("Player is already inside the beacon, skipping navigating to beacon screen");
            }
        }
    }
};

export const playerInsideBeaconTrigger = (boolean) => {
    return {
        type: PLAYER_INSIDE_BEACON,
        isPlayerInsideBeacon: boolean
    }
};

export const storeBearing = () => {
    var bearing = 0;
    const absoluteBearing = calculateBearing(
        store.getState().gameDataReducer.currentLocation,
        store.getState().gameDataReducer.nextBeacon);

    //calculate the difference between calculated bearing and the GPS heading value
    if(store.getState().gameDataReducer.currentLocation.heading != null &&
        !isNaN(parseFloat(store.getState().gameDataReducer.currentLocation.heading)))
    {
        // NB: 45 degrees less because arrow is already tilted at 45 degrees
        bearing = ((store.getState().gameDataReducer.currentLocation.heading - absoluteBearing) * -1) - 45;
    } else {

        bearing = absoluteBearing;
    }

    return{
        type:STORE_BEARING,
        bearing: bearing
    }
};

export const setMapViewVisible = (mapViewVisible) =>{
    return{
        type:SET_MAP_VIEW_VISIBLE,
        mapViewVisible: mapViewVisible,
    }
};

export const onCloseRiddleSolvingModal = () => {
    return{
        type:RIDDLE_SOLVING_CLOSE_MODAL,
    }
};

export const onRequestRiddleSolvingModal = () => {
    return{
        type: RIDDLE_SOLVING_REQUEST_MODAL,
    }
};

export const onCloseOutOfZoneModal = () => {
    store.dispatch(resetOutOfZoneTimer());
    return{
        type:OUT_OF_ZONE_CLOSE_MODAL,
    }
};

export const onRequestOutOfZoneModal = () => {
    return{
        type: OUT_OF_ZONE_REQUEST_MODAL,
    }
};

export const onConfirmRiddleSolving = ()=>{
    if(store.getState().gameDataReducer.currentAnswer.toLowerCase() ===
        store.getState().gameDataReducer.nextBeacon.answer.toLowerCase()) {
        store.dispatch(getNextBeacon());
        store.dispatch(onCloseRiddleSolvingModal());
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: true,
            currentAnswer: '',
        }
    } else {
        store.dispatch(decrementTeamLive());
        if(store.getState().gameDataReducer.teamInfo.lives === 0){
            store.dispatch(gameOver())
        }
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: false,
            currentAnswer: store.getState().gameDataReducer.currentAnswer,
        }
    }
};

export const onConfirmQRScan = (scannerData) =>{
    if(scannerData.data === store.getState().gameDataReducer.nextBeacon.answer) {
        store.dispatch(getNextBeacon());
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: true,
            currentAnswer: '',
        }
    } else {
        store.dispatch(decrementTeamLive());
        if(store.getState().gameDataReducer.teamInfo.lives === 0){
            store.dispatch(gameOver())
        }
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: false,
            currentAnswer: store.getState().gameDataReducer.currentAnswer,
        }
    }
};

export const decrementTeamLive = () => {
    return (dispatch) => {
        let params = {
            nameTeam: store.getState().gameDataReducer.teamInfo.name,
            namePlayer: store.getState().joinGameReducer.playerName,
            playercode: store.getState().gameDataReducer.game.PlayerCode
        };
        let request = prepareRequest(params, "PUT");
        console.log("Refreshing position with /decrementlife");
        console.log("Parameters");
        console.log(params);
        console.log("Request");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/decrementlife', request)
            .then((response) => {
                console.log("Response :");
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                else {
                    if(response.status === 403) {
                        if (response.text() === "PLAYER_DOESNT_EXIST") {
                            ToastAndroid.show('The player sent in request does not exist...', ToastAndroid.LONG);
                        } else if (response.text() === "TEAM_INVALID") {
                            ToastAndroid.show('The team send in request is not valid...', ToastAndroid.LONG);
                        } else if (response.text() === "GAME_DOESNT_EXIST") {
                            ToastAndroid.show('The game does not exist...', ToastAndroid.LONG);
                        }
                    }
                    console.log(response);
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                if (!json.hasError) {
                    dispatch(decrementLiveContd());
                    if (store.getState().gameDataReducer.settings.lives !== 0 &&
                        store.getState().gameDataReducer.teamInfo.lives <= 0) {
                        dispatch(getLastBeacon());
                    }
                }
            });
    }
};

export const decrementLiveContd = () => {
    return {
        type: DECREMENT_TEAM_LIVE,
    }
};

export const gameOver = () => {
    store.dispatch(getLastBeacon());
    //previously used when not lastbeacon API and serveur automatically send out the last point on a gameover
    //store.dispatch(getNextBeacon());
    //navigatorRef.dispatch(NavigationActions.navigate({routeName:"GameOverScreen"}));
};

export const setCurrentAnswer = (answer) => {
    return {
        type:SET_CURRENT_ANSWER,
        currentAnswer: answer,
        isSubmitButtonPressed: false
    }
};

export const submitButtonPressed = () => {
    if(!store.getState().gameDataReducer.correctAnswer) {
        return {
            type: RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED,
            isSubmitButtonPressed: true
        }
    } else {
        return {
            type: RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED,
            isSubmitButtonPressed: false
        }
    }
};

export const storeEndGameStats = (json) => {
    return {
        type:STORE_END_GAME_STATS,
        classement: json.classement,
        totalTeams: json.totalTeams,
        score: json.score,
        time: json.time
    }
};

export const shrinkZone = () => {

    return{
        type: SHRINK_ZONE,
        shrinkZoneRadius: (store.getState().gameDataReducer.settings.radius -
                            store.getState().gameDataReducer.settings.tresholdShrink)
    }
};

export const onRegionChange = (newRegion) => {
    return{
        type:CENTER_REGION_CHANGED,
        newRegion: newRegion
    }
};

export const storeTimerIds = (watchID, shrinkIntervalID, refreshIntervalID, notifyUserID) => {
    return {
        type: STORE_TIMER_IDS,
        watchID: watchID,
        shrinkIntervalID: shrinkIntervalID,
        refreshIntervalID: refreshIntervalID,
        notifyUserID: notifyUserID,
    }
};

export const riddleTimeOut = () => {
    return (dispatch) => {
        dispatch(decrementTeamLive());
        dispatch(decrementTeamLive());
        if (store.getState().gameDataReducer.game.GameMode === GAME_MODES.RIDDLES) {
            ToastAndroid.show('The answer was: ' + store.getState().gameDataReducer.nextBeacon.answer, ToastAndroid.LONG);
        }

        if (store.getState().gameDataReducer.teamInfo.lives <= 0) {
            console.log("Attempting to get lastBeacon");
            dispatch(getLastBeacon());
        } else {
            console.log("Attempting to get nextBeacon");
            dispatch(getNextBeacon());
        }
    }
};

export const setNextBeaconFetchActivity = (boolean) => {
    return {
        type: SET_NEXTBEACON_FETCH_STATUS,
        showNextBeaconFetchActivity: boolean
    }
};

export const updateTimer = (secondsRemaining) => {
    return {
        type: UPDATE_TIMER,
        timerSecondsRemaining: secondsRemaining
    }

};

export const resetTimer = () => {
    return {
        type: RESET_TIMER,
        timerSecondsRemaining: store.getState().gameDataReducer.settings.timerRiddle
    }
};

export const updateOutOfZoneTimer = (secondsRemaining) => {
    return {
        type: UPDATE_OUT_OF_ZONE_TIMER,
        outOfZoneTimerSeconds: secondsRemaining
    }

};

export const resetOutOfZoneTimer = () => {
    return {
        type: RESET_OUT_OF_ZONE_TIMER,
        outOfZoneTimerSeconds: GLOBAL_SETTINGS.OUT_OF_ZONE_TIMEOUT
    }
};

export const setGameOver = () => {
    return {
        type: SET_GAME_OVER,
    }
};

export const setCurrentLocationAcquired = (boolean) => {
    return {
        type: SET_CURRENT_LOCATION_ACQUIRED,
        currentLocationAcquired: boolean
    }
};

export const resetBackOffId = () => {
    return {
        type: RESET_BACKOFF_ID
    }
};

export const incrementCheckpoint = () => {
    return {
        type: INCREMENT_CHECKPOINT,
        //currentCheckpoint: (store.getState().gameDataReducer.currentCheckpoint + 1)
    }
};

export const resetCheckpointCounter = () => {
    return {
        type: RESET_CHECKPOINT
    }
};

export const currentLocationLongLoadTime = () => {
    return {
        type: LOCATION_LONG_LOAD_TIME
    }
};

export const resetLocationLongLoadTime = () => {
    return {
        type: RESET_LOCATION_LOAD_TIME
    }
};