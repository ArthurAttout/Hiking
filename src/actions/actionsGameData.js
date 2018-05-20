import store from "../config/store";
import {calculateBearing, calculateDistance} from "../utils/geometryUtils";
import {fetchPlayerStatus} from "./actionsJoinGame";

export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';
export const STORE_CURRENT_LOCATION = 'STORE_CURRENT_LOCATION';
export const SET_MAP_VIEW_VISIBLE = 'SET_MAP_VIEW_VISIBLE';
export const STORE_BEARING = 'STORE_BEARING';
export const PLAYER_INSIDE_BEACON = 'PLAYER_INSIDE_BEACON';

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
    /*console.log(store.getState().gameDataReducer.currentLocation);
    console.log(store.getState().gameDataReducer.nextBeacon);
    console.log(bearing);*/

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