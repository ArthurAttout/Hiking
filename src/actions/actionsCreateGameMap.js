import UUIDGenerator from 'react-native-uuid-generator';
import {calculateTotalDistance} from '../utils/geometryUtils'
import store from '../config/store'

export const DRAG_BEACON = 'DRAG_BEACON';
export const SETUP_INITIAL_MAP = 'SETUP_INITIAL_MAP';
export const ADD_NEW_BEACON = 'ADD_NEW_BEACON';
export const TOGGLE_TRACKING = 'TOGGLE_TRACKING';
export const TOUCH_BEACON = 'TOUCH_BEACON';
export const CENTER_REGION_CHANGED = 'CENTER_REGION_CHANGED';
export const CLEAR_PATH = 'CLEAR_PATH';
export const CONFIRM_PATH = 'CONFIRM_PATH';
export const CHANGE_SIDE_MENU_OPENED = 'CHANGE_SIDE_MENU_OPENED';

export const dragBeacon = (original,coord) =>{
    return{
        type:DRAG_BEACON,
        draggedBeacon:original,
        newCoordinates:coord,
        totalDistance: calculateTotalDistance(store.getState().createGameMapReducer.currentTrack)
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
    }
};

export const startTracking = () =>{
    return{
        type:TOGGLE_TRACKING
}};

export const onCenterRegionChange = (newRegion) =>{
    return{
        type:CENTER_REGION_CHANGED,
        payload:newRegion
    }
};

export const onClearLinkedPath = () =>{
    return{
        type:CLEAR_PATH
    }
};

export const onConfirmLinkedPath = () => {
    return{
        type:CONFIRM_PATH,
        payload: calculateTotalDistance(store.getState().createGameMapReducer.currentTrack)
    }
};

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_SIDE_MENU_OPENED,
        payload: isOpen
    }
};

