import store from "../config/store";
import {calculateBearing, calculateDistance} from "../utils/geometryUtils";
import {getNextBeacon2} from "../config/FakeServer";
import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';

export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';
export const STORE_CURRENT_LOCATION = 'STORE_CURRENT_LOCATION';
export const SET_MAP_VIEW_VISIBLE = 'SET_MAP_VIEW_VISIBLE';
export const STORE_BEARING = 'STORE_BEARING';
export const PLAYER_INSIDE_BEACON = 'PLAYER_INSIDE_BEACON';
export const RIDDLE_SOLVING_CLOSE_MODAL = 'RIDDLE_SOLVING_CLOSE_MODAL';
export const RIDDLE_SOLVING_REQUEST_MODAL = 'RIDDLE_SOLVING_REQUEST_MODAL';
export const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
export const CONFIRM_RIDDLE_SOLVING = 'CONFIRM_RIDDLE_SOLVING';
export const RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED = 'RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED';
export const STORE_END_GAME_STATS = 'STORE_END_GAME_STATS';

// TODO view what to store
export const storeServerData = (gameData) =>{
    // TODO filter based on game mode
    return{
        type:STORE_SERVER_DATA,
        gameMode: gameData.gameMode,
        shrinkSpeed: gameData.shrinkSpeed,
        mapViewEnabled: gameData.mapViewEnabled,
        nextBeaconVisible: gameData.nextBeaconVisible,
        displayDropDistance: gameData.displayDropDistance,
        timerRiddle: gameData.timerMaxRiddle,
        lives: gameData.lives,
    }
};

export const storeNextBeacon = (nextBeacon) =>{
    return{
        type:STORE_NEXT_BEACON,
        id: nextBeacon.id,
        latitude: nextBeacon.latitude,
        longitude: nextBeacon.longitude,
        name: nextBeacon.name,
        iconUrl: nextBeacon.iconUrl,
        qrCodeId: nextBeacon.qrCodeId,
        riddleId:  nextBeacon.riddleId,
        riddleStatement: nextBeacon.riddleStatement,
        riddleAnswer: nextBeacon.riddleAnswer,
        lastBeacon: nextBeacon.lastBeacon,
    }
};

export const storeCurrentLocation = (currentLocation) =>{


    return{
        type:STORE_CURRENT_LOCATION,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
        heading: currentLocation.heading,
        speed: currentLocation.speed,
        accuracy: currentLocation.accuracy,
        error: currentLocation.error,
    }
};

export const checkPlayerInsideBeacon = () => {
    // TODO test is current position is within 5m of the nextBeacon
    if(calculateDistance(store.getState().gameDataReducer.currentLocation,
            store.getState().gameDataReducer.nextBeacon) < 5){
        return{
            type:PLAYER_INSIDE_BEACON,
            isPlayerInsideBeacon: true
        }
    } else {
        return{
            type:PLAYER_INSIDE_BEACON,
            isPlayerInsideBeacon: false
        }
    }
};

export const storeBearing = () => {
    //TODO manage arrow directions
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
        console.log(store.getState().gameDataReducer.currentLocation.heading);
        console.log(bearing);
    } else {
        console.log("Current location heading not valid, using absoluteBearing");
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

export const onCloseModal = () => {
    return{
        type:RIDDLE_SOLVING_CLOSE_MODAL,
    }
};

export const onRequestModal = () => {
    return{
        type: RIDDLE_SOLVING_REQUEST_MODAL,
    }
};

export const onConfirmRiddleSolving = ()=>{
    console.log(store.getState().gameDataReducer.currentAnswer);
    if(store.getState().gameDataReducer.currentAnswer === store.getState().gameDataReducer.nextBeacon.riddleAnswer) {
        const nextBeacon = getNextBeacon2(store.getState().gameDataReducer.gameCode,
            store.getState().gameDataReducer.teamName);
        store.dispatch(storeNextBeacon(nextBeacon));
        // TODO manage changing screen when correct answer given
        navigatorRef.dispatch(NavigationActions.navigate({
            routeName:"GameScreen"
        }));
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: true,
            modalVisible: false,
            currentAnswer: ''
        }
    } else {
        // TODO display error message

        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: false,
            modalVisible: true,
            currentAnswer: store.getState().gameDataReducer.currentAnswer
        }
    }
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

export const storeEndGameStats = (gameStats) => {
    return {
        type:STORE_END_GAME_STATS,
        time: gameStats.time,
        score: gameStats.score,
        position: gameStats.position,
        totalTeams: gameStats.totalTeams,
    }
};

