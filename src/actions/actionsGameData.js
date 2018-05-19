export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';

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