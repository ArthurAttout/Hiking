export const ADD_NEW_TRACK = 'ADD_NEW_TRACK';
export const CLEAR_BEACONS = 'CLEAR_BEACONS';
export const DELETE_TRACK = 'DELETE_TRACK';
export const EDIT_TRACK = 'EDIT_TRACK';
export const EDIT_TRACK_NAME = 'EDIT_TRACK_NAME';
export const FOCUS_ON_BEACON = 'FOCUS_ON_BEACON';
export const SUBMIT_TRACK_NAME = 'SUBMIT_TRACK_NAME';
export const TRACK_NAME_CHANGED = 'TRACK_NAME_CHANGED';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_MODAL = 'REQUEST_MODAL';
export const SET_IMAGE_PATH = 'SET_IMAGE_PATH';
export const CANCEL_CUSTOMIZE_BEACON = 'CANCEL_CUSTOMIZE_BEACON';
export const SET_CURRENT_BEACON_NAME = 'SET_CURRENT_BEACON_NAME';
export const CONFIRM_CUSTOMIZE_BEACON = 'CONFIRM_CUSTOMIZE_BEACON';
export const SHOW_MODAL_ADD_CUSTOM_RIDDLE = 'SHOW_MODAL_ADD_CUSTOM_RIDDLE';
export const SHOW_MODAL_ADD_RANDOM_RIDDLE = 'SHOW_MODAL_ADD_RANDOM_RIDDLE';
export const CLOSE_MODAL_ADD_CUSTOM_RIDDLE = 'CLOSE_MODAL_ADD_CUSTOM_RIDDLE';
export const CLOSE_MODAL_ADD_RANDOM_RIDDLE = 'CLOSE_MODAL_ADD_RANDOM_RIDDLE';
export const SET_CURRENT_BEACON_RIDDLE_ANSWER = 'SET_CURRENT_BEACON_RIDDLE_ANSWER';
export const SET_CURRENT_BEACON_RIDDLE_STATEMENT = 'SET_CURRENT_BEACON_RIDDLE_STATEMENT';
export const SHOW_QR_CODE_PICKER = 'SHOW_QR_CODE_PICKER';
export const CLOSE_QR_CODE_PICKER = 'CLOSE_QR_CODE_PICKER';
export const SET_CURRENT_BEACON_QR_CODE = 'SET_CURRENT_BEACON_QR_CODE';
export const SHOW_MODAL_BEACON_ID = 'SHOW_MODAL_BEACON_ID';
export const CLOSE_MODAL_BEACON_ID = 'CLOSE_MODAL_BEACON_ID';

export const RANDOM_RIDDLE_LOADING = 'RANDOM_RIDDLE_LOADING';
export const RANDOM_RIDDLE_LOADED = 'RANDOM_RIDDLE_LOADED';
export const REQUEST_NEW_RANDOM_RIDDLE = 'REQUEST_NEW_RANDOM_RIDDLE';

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
        payload:track,
    }
};

export const onFocusOnBeacon = (beacon) =>{
    return{
        type: FOCUS_ON_BEACON,
        payload: beacon
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


export const addNewTrack = () =>{
    return {
        type:ADD_NEW_TRACK
    }
};

export const onCloseModal = () => {
    return{
        type:CLOSE_MODAL
    }
};

export const onRequestModal = (beacon) => {
    return{
        type: REQUEST_MODAL,
        beacon: beacon
    }
};

export const setImagePath = (path) =>{
    return{
        type:SET_IMAGE_PATH,
        path:path,
    }
};

export const onCancelCustomizeBeacon = (beacon) => {
    return {
        type:CANCEL_CUSTOMIZE_BEACON,
        beacon: beacon
    }
};

export const onConfirmCustomizeBeacon = ()=>{
    return{
        type:CONFIRM_CUSTOMIZE_BEACON
    }
};

export const setCurrentBeaconName = (name) => {
    return {
        type:SET_CURRENT_BEACON_NAME,
        name: name
    }
};

export const addCustomRiddle = () => {
    return{
        type:SHOW_MODAL_ADD_CUSTOM_RIDDLE
    }
};

export const addRandomRiddle = () => {
    return(dispatch) => {
        dispatch(randomRiddleLoading());
        fetch("http://jservice.io/api/random")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                dispatch(randomRiddleLoaded(result[0]))
            });
    }
};

export const requestNewRandomRiddle = () => {
    return(dispatch) => {
        fetch("http://jservice.io/api/random")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                dispatch(randomRiddleLoaded(result[0]))
            });
    }
};

export const randomRiddleLoading = () => {
    return{
        type:RANDOM_RIDDLE_LOADING
    }
};

export const randomRiddleLoaded = (riddle) => {
    return{
        type: RANDOM_RIDDLE_LOADED,
        riddle: riddle
    }
};

export const submitCustomRiddle = () => {
    return{
        type:CLOSE_MODAL_ADD_CUSTOM_RIDDLE
    }
};

export const submitRandomRiddle = () => {
    return{
        type:CLOSE_MODAL_ADD_RANDOM_RIDDLE
    }
};

export const setCurrentBeaconRiddleAnswer = (answer) => {
    return{
        type:SET_CURRENT_BEACON_RIDDLE_ANSWER,
        answer: answer
    }
};

export const setCurrentBeaconRiddleStatement = (statement) => {
    return{
        type:SET_CURRENT_BEACON_RIDDLE_STATEMENT,
        statement: statement
    }
};

export const showQRCodePicker = () => {
    return{
        type: SHOW_QR_CODE_PICKER
    }
};

export const closeQRCodePicker = () => {
    console.log("aaaaaaaa");
    return{
        type: CLOSE_QR_CODE_PICKER
    }
};

export const setCurrentBeaconQRCode = (code) => {
    console.log(code);
    return{
        type:SET_CURRENT_BEACON_QR_CODE,
        code: code,
    }
};

export const showModalBeaconID = () => {
    return{
        type:SHOW_MODAL_BEACON_ID,
    }
};

export const closeModalBeaconID = () => {
    return{
        type:CLOSE_MODAL_BEACON_ID
    }
};

