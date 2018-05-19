export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';
export const STORE_CURRENT_LOCATION = 'STORE_CURRENT_LOCATION';
export const SET_MAP_VIEW_VISIBLE = 'SET_MAP_VIEW_VISIBLE';

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
        accuracy: currentLocation.accuracy,
        error: currentLocation.error,
    }
};

export const setMapViewVisible = (mapViewVisible) =>{
    return{
        type:SET_MAP_VIEW_VISIBLE,
        mapViewVisible: mapViewVisible,
    }
};