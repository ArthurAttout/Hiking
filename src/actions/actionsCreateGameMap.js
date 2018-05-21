import UUIDGenerator from 'react-native-uuid-generator';
import {calculateTotalDistance,calculateDeltaAltitude} from '../utils/geometryUtils'
import store from '../config/store'

export const DRAG_BEACON = 'DRAG_BEACON';
export const SETUP_INITIAL_MAP = 'SETUP_INITIAL_MAP';
export const ADD_NEW_BEACON = 'ADD_NEW_BEACON';
export const TOGGLE_TRACKING = 'TOGGLE_TRACKING';
export const TOUCH_BEACON = 'TOUCH_BEACON';
export const DRAG_FINISH_LINE = 'DRAG_FINISH_LINE';
export const CENTER_REGION_CHANGED = 'CENTER_REGION_CHANGED';
export const CLEAR_PATH = 'CLEAR_PATH';
export const CONFIRM_PATH = 'CONFIRM_PATH';
export const CHANGE_SIDE_MENU_OPENED = 'CHANGE_SIDE_MENU_OPENED';
export const CALCULATING_PATH = 'CALCULATING_PATH';
export const DONE_CALCULATING_PATH = 'DONE_CALCULATING_PATH';

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
    return dispatch => {
        let curr = store.getState().createGameMapReducer.currentTrack;

        dispatch(fetchingDistances());
        return calculateDeltaAltitude(curr)
            .then(function(res) {
                dispatch(doneCalculatingDistances(curr, res))
            })
            .catch(error => console.log("Error with fetch : " + error));
    };
};

export const fetchingDistances = () => {
    return{
        type:CALCULATING_PATH
    }
};

export const doneCalculatingDistances = (track, totalDelta) => {
    return{
        type:DONE_CALCULATING_PATH,
        totalDistance: calculateTotalDistance(track),
        totalDelta: totalDelta,
        track: track,
    }
};

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_SIDE_MENU_OPENED,
        payload: isOpen
    }
};

export const dragFinishLine = (coord) => {
    return (dispatch) => {
        dispatch(dragFinishLineContd(coord));
        dispatch(calculateAllDistances());
    }
};

export const dragFinishLineContd = (coord) => {
    return{
        type: DRAG_FINISH_LINE,
        coord: coord
    }
};

export const calculateAllDistances = () => {
    return (dispatch) => {
        store.getState().createGameMapReducer.tracks.map((track) => {
            calculateDeltaAltitude(store.getState().createGameMapReducer.currentTrack)
                .then(function(totalAltitudeDelta) {
                    dispatch(doneCalculatingDistances(track, totalAltitudeDelta))
                })
                .catch(error => console.log("Error with fetch : " + error));
        })
    }
};
