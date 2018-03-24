import UUIDGenerator from 'react-native-uuid-generator';

export const DRAG_BEACON = 'DRAG_BEACON';
export const SETUP_INITIAL_MAP = 'SETUP_INITIAL_MAP';
export const ADD_NEW_BEACON = 'ADD_NEW_BEACON';
export const TOGGLE_TRACKING = 'TOGGLE_TRACKING';
export const TOUCH_BEACON = 'TOUCH_BEACON';

export const dragBeacon = (original,coord) =>{
    return{
        type:DRAG_BEACON,
        draggedBeacon:original,
        newCoordinates:coord
    }
};

export const touchBeacon = (beacon) =>{
    return {
        type:TOUCH_BEACON,
        touchedBeacon: beacon
    }
};

export const setupInitialMap = (evt) => ({
    type:SETUP_INITIAL_MAP,
    centerLatitude:  50.223777,
    centerLongitude: 5.335017,
    centerLatitudeDelta: 0.015,
    centerLongitudeDelta: 0.0121,
});

export const addBeacon = () => {

    return {
        type:ADD_NEW_BEACON,
        id:UUIDGenerator.getRandomUUID(),
        latitude:  50.223777,
        longitude: 5.335017,
        centerLatitudeDelta: 0.015,
        centerLongitudeDelta: 0.0121,
    }
};

export const startTracking = () =>{
    return{
        type:TOGGLE_TRACKING
}};