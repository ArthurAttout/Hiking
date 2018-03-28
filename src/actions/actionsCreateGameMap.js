import UUIDGenerator from 'react-native-uuid-generator';
import {calculateTotalDistance} from '../utils/geometryUtils'
import store from '../config/store'

export const DRAG_BEACON = 'DRAG_BEACON';
export const SETUP_INITIAL_MAP = 'SETUP_INITIAL_MAP';
export const ADD_NEW_BEACON = 'ADD_NEW_BEACON';
export const TOGGLE_TRACKING = 'TOGGLE_TRACKING';
export const TOUCH_BEACON = 'TOUCH_BEACON';
export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const CENTER_REGION_CHANGED = 'CENTER_REGION_CHANGED';
export const DELETE_TRACK = 'DELETE_TRACK';
export const EDIT_TRACK = 'EDIT_TRACK';
export const CLEAR_BEACONS = 'CLEAR_BEACONS';
export const CLEAR_PATH = 'CLEAR_PATH';
export const CONFIRM_PATH = 'CONFIRM_PATH';
export const CHANGE_SIDE_MENU_OPENED = 'CHANGE_SIDE_MENU_OPENED';
export const EDIT_TRACK_NAME = 'EDIT_TRACK_NAME';
export const TRACK_NAME_CHANGED = 'TRACK_NAME_CHANGED';
export const SUBMIT_TRACK_NAME = 'SUBMIT_TRACK_NAME';

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
    }
};

export const startTracking = () =>{
    return{
        type:TOGGLE_TRACKING
}};

export const addNewTrack = () =>{
    return {
        type:ADD_NEW_TRACK
    }
};

export const onCenterRegionChange = (newRegion) =>{
    return{
        type:CENTER_REGION_CHANGED,
        payload:newRegion
    }
};

export const onDeleteTrack = (track) =>{
    return{
        type:DELETE_TRACK,
        payload:track
    }
};

export const onEditTrack = (trackID) => {
    return{
        type:EDIT_TRACK,
        payload:trackID
    }
};

export const onClearBeacons = (track) => {
    return{
        type:CLEAR_BEACONS,
        payload:track
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

export const onEditTrackName = (track) =>{
    return{
        type:EDIT_TRACK_NAME,
        payload: track
    }
};

export const trackNameChanged = (track,newName) =>{
    return{
        type:TRACK_NAME_CHANGED,
        payload:{
            track:track,
            newName:newName
        }
    }
};

export const onSubmitTrackName = (track) => {
    return{
        type:SUBMIT_TRACK_NAME,
        payload:track
    }
};