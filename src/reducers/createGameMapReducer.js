import {
    DRAG_BEACON, SETUP_INITIAL_MAP, ADD_NEW_BEACON, TOGGLE_TRACKING,
    TOUCH_BEACON,CENTER_REGION_CHANGED, CLEAR_PATH,CALCULATING_PATH,DONE_CALCULATING_PATH
} from "../actions/actionsCreateGameMap";

import {FOCUS_ON_BEACON,SUBMIT_TRACK_NAME,TRACK_NAME_CHANGED,EDIT_TRACK_NAME,CANCEL_CUSTOMIZE_BEACON,CONFIRM_CUSTOMIZE_BEACON,
    EDIT_TRACK,CLEAR_BEACONS,DELETE_TRACK,ADD_NEW_TRACK,CLOSE_MODAL,REQUEST_MODAL,SET_IMAGE_PATH,SET_CURRENT_BEACON_NAME,
    SHOW_MODAL_ADD_CUSTOM_RIDDLE,SHOW_MODAL_ADD_RANDOM_RIDDLE,CLOSE_MODAL_ADD_CUSTOM_RIDDLE,CLOSE_MODAL_ADD_RANDOM_RIDDLE,
    SET_CURRENT_BEACON_RIDDLE_STATEMENT,SET_CURRENT_BEACON_RIDDLE_ANSWER,RANDOM_RIDDLE_LOADED,RANDOM_RIDDLE_LOADING,
    SHOW_QR_CODE_PICKER,CLOSE_QR_CODE_PICKER,SET_CURRENT_BEACON_QR_CODE,SHOW_MODAL_BEACON_ID,CLOSE_MODAL_BEACON_ID
} from '../actions/actionsCreateGameMapDrawer'

import UUIDGenerator from 'react-native-uuid-generator';

let dataState = {
    loading: true,
    currentTrack:{
        id:undefined,
        beacons:[]
    },
    tracks: [],               //All the tracks the user made
    isTrackingMode: false,
    newCenteredRegion: undefined,
    confirmLinkedBeacons:false,
    sideMenuOpened: false,
    regionFocus:undefined,
    showQRCodePicker: false,
    modalBeaconIDVisible: false,
    modalVisible:false,
    userCanFinish: false,
    currentCustomizingBeacon: {
        name:undefined,
        imagePath:undefined,
        qrCode:undefined,
        riddle:{
            statement: undefined,
            answer: undefined
        }
    }
};

export default function createGameMapReducer(state = dataState, action){
    switch (action.type) {

        case SETUP_INITIAL_MAP:
            let generatedUUID = UUIDGenerator.getRandomUUID();
            return {
                ...state,
                currentTrack: {
                    ...state.currentTrack,
                    id:generatedUUID,
                    path:[]
                },
                tracks: [{
                    id: generatedUUID,
                    trackName: "Track 1",
                    beacons: [],
                    path:[]
                }],
                centerRegion:{
                    latitude: action.centerLatitude,
                    longitude: action.centerLongitude,
                    latitudeDelta: action.centerLatitudeDelta,
                    longitudeDelta: action.centerLongitudeDelta,
                },
                newCenteredRegion:{
                    latitude: action.centerLatitude,
                    longitude: action.centerLongitude,
                    latitudeDelta: action.centerLatitudeDelta,
                    longitudeDelta: action.centerLongitudeDelta,
                }
            };

        case ADD_NEW_BEACON:
            if(state.isTrackingMode){
                return {
                    ...state,
                    isTrackingMode: false
                }
            }
            return {
                ...state,
                isTrackingMode:false,
                tracks : state.tracks.map((item,index) => {
                    if(item.id === state.currentTrack.id){
                        return {
                            ...item,
                            beacons: item.beacons.concat({
                                id: action.id,
                                coordinate:{
                                    latitude: state.newCenteredRegion.latitude,
                                    longitude: state.newCenteredRegion.longitude
                                }
                            })
                        }
                    }
                    return item;
                }),
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.concat({
                        id: action.id,
                        coordinate:{
                            latitude: state.newCenteredRegion.latitude,
                            longitude: state.newCenteredRegion.longitude
                        }
                    }),
                },
                centerRegion:state.newCenteredRegion
            };

        case TOGGLE_TRACKING:
            return {
                ...state,
                isTrackingMode:true
            };

        case TOUCH_BEACON:
            if(state.isTrackingMode){
                let newState = {
                    ...state,
                    tracks:state.tracks.map((track,index) => {
                        if (track.id === state.currentTrack.id) {
                            if (!track.beacons.some((item) => item.id === action.touchedBeacon.id)) { //Prevent user from adding twice the same location
                                return {
                                    ...track,
                                    beacons: track.beacons.concat(action.touchedBeacon)
                                }
                            }
                        }
                        return track;
                    })};
                if(!newState.currentTrack.path.some((item) => item.id === action.touchedBeacon.id)){//Prevent user from adding twice the same location
                    newState = {
                        ...newState,
                        currentTrack:{
                            ...newState.currentTrack,
                            path: newState.currentTrack.path.concat({
                                id:action.touchedBeacon.id,
                                latitude:action.touchedBeacon.coordinate.latitude,
                                longitude:action.touchedBeacon.coordinate.longitude,
                            })
                        }
                    }
                }

                if(newState.currentTrack.path.length === newState.currentTrack.beacons.length){ //The user has linked all beacons
                    return{
                        ...newState,
                        confirmLinkedBeacons:true
                    }
                }
                return newState;
            }
            return state;

        case DRAG_BEACON:

            return {
                ...state,
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.map((beacon,index) => {
                        if(beacon.id === action.draggedBeacon.id){
                            return {
                                ...beacon,
                                coordinate:{
                                    ...beacon.coordinate,
                                    latitude:action.newCoordinates.latitude,
                                    longitude:action.newCoordinates.longitude
                                }
                            }
                        }
                        return beacon;
                    }),
                    path:state.currentTrack.path.map((beacon,index) => {
                        if(beacon.id === action.draggedBeacon.id){
                            return {
                                ...beacon,
                                latitude:action.newCoordinates.latitude,
                                longitude:action.newCoordinates.longitude
                            }
                        }
                        return beacon;
                    })},

                    tracks:state.tracks.map((track,index) => {
                        let newTrack = {
                            ...track,
                            beacons : track.beacons.map((beacon,index) => {
                                if(beacon.id === action.draggedBeacon.id){
                                    return {
                                        ...beacon,
                                        coordinate:{
                                            ...beacon.coordinate,
                                            latitude:action.newCoordinates.latitude,
                                            longitude:action.newCoordinates.longitude
                                        }
                                    }
                                }
                                return beacon;
                            }),
                            path : track.path.map((beacon,index) => {
                                if(beacon.id === action.draggedBeacon.id){
                                    return {
                                        ...beacon,
                                        latitude:action.newCoordinates.latitude,
                                        longitude:action.newCoordinates.longitude
                                    }
                                }
                                return beacon;
                            })
                        };
                        if(track.id === state.currentTrack.id){
                            return {
                                ...newTrack,
                                totalDistance: action.totalDistance
                            }
                        }
                        return newTrack;
                    })
                };

        case ADD_NEW_TRACK:
            return{
                ...state,
                userCanFinish: false,
                tracks:state.tracks.concat({
                    trackName: "Track " + (state.tracks.length + 1),
                    id: UUIDGenerator.getRandomUUID(),
                    beacons: [],
                    path:[]
                })
            };

        case CENTER_REGION_CHANGED:
            return {
                ...state,
                newCenteredRegion:action.payload
            };

        case DELETE_TRACK:
            let newState = {
                ...state,
                tracks: state.tracks.filter((track) => track.id !== action.payload.id),
            };

            if(newState.currentTrack.id === action.payload.id){
                newState = {
                    ...newState,
                    currentTrack:{
                        id: undefined,
                        beacons:[],
                        path:[]
                    }
                }
            }
            return {
                ...newState,
                userCanFinish: !newState.tracks.some((t) => !t.finished)
            };

        case EDIT_TRACK:
            return {
                ...state,
                currentTrack:{
                    id: action.payload.id,
                    beacons:action.payload.beacons,
                    path: action.payload.path
                },
                isTrackingMode: false
            };

        case CLEAR_BEACONS:
            newState = {
                ...state,
                userCanFinish: false,
                tracks: state.tracks.map((item) => {
                    if(item.id === action.payload.id){
                        return{
                            ...item,
                            beacons:[],
                            path:[],
                            totalDistance: undefined
                        }
                    }
                    return item;
                })
            };

            if(newState.currentTrack.id === action.payload.id){
                newState = {
                    ...newState,
                    currentTrack:{
                        ...newState.currentTrack,
                        beacons:[],
                        path:[]
                    }
                }
            }
            return newState;

        case DONE_CALCULATING_PATH:
            newState =  {
                ...state,
                confirmLinkedBeacons: false,
                tracks:state.tracks.map((track,index) => {
                    if(track.id === state.currentTrack.id){
                        return {
                            ...track,
                            finished: true,
                            path:state.currentTrack.path,
                            totalDistance: action.totalDistance,
                            altitudeDelta: action.totalDelta
                        }
                    }
                    return track;
                })
            };
            if(!newState.tracks.some((t) => !t.finished)){ //All the tracks are finished
                return{
                    ...newState,
                    userCanFinish: true
                }
            }
            return newState;

        case CLEAR_PATH:
            return {
                ...state,
                confirmLinkedBeacons: false,
                currentTrack:{
                    ...state.currentTrack,
                    path:[]
                }
            };

        case EDIT_TRACK_NAME:
            return{
                ...state,
                sideMenuOpened: true,
                tracks: state.tracks.map((item) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            isNameEditable: true
                        }
                    }
                    return item;
                })
            };

        case TRACK_NAME_CHANGED:
            return {
                ...state,
                sideMenuOpened: true,
                tracks: state.tracks.map((item) => {
                    if(item.id === action.payload.track.id){
                        return {
                            ...item,
                            trackName: action.payload.newName
                        }
                    }
                    return item;
                })
            };

        case FOCUS_ON_BEACON:
            return {
                ...state,
                regionFocus:{
                    latitudeDelta: state.centerRegion.latitudeDelta,
                    longitudeDelta: state.centerRegion.longitudeDelta,
                    latitude: action.payload.coordinate.latitude,
                    longitude: action.payload.coordinate.longitude,
                },
                centerRegion:undefined
            };

        case CLOSE_MODAL:
            return{
                ...state,
                modalVisible:false
            };

        case REQUEST_MODAL:
            return{
                ...state,
                modalVisible:true,
                currentCustomizingBeacon: {
                    ...state.currentCustomizingBeacon,
                    id: action.beacon.id,
                    name: action.beacon.name,
                    qrCode: action.beacon.qrCode,
                    riddle: {
                        ...action.beacon.riddle,
                    }
                }
            };

        case SET_IMAGE_PATH:
            return {
                ...state,
                modalVisible:false,
                currentCustomizingBeacon:{
                    ...state.currentCustomizingBeacon,
                    imagePath:action.path
                },
                tracks : state.tracks.map((item,index) => {
                    if(item.id === state.currentTrack.id){
                        return {
                            ...item,
                            beacons: item.beacons.map((beacon) => {
                                if(beacon.id === state.currentCustomizingBeacon.id){
                                    return{
                                        ...beacon,
                                        imagePath: action.path,
                                        name: state.currentCustomizingBeacon.name,
                                    }
                                }
                                return beacon;
                            })
                        }
                    }
                    return item;
                }),
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.map((beacon) => {
                        if(beacon.id === state.currentCustomizingBeacon.id){
                            return{
                                ...beacon,
                                imagePath:action.path
                            }
                        }
                        return beacon;
                    })
                }
            };

        case CANCEL_CUSTOMIZE_BEACON:
            return{
                ...state,
                modalVisible:false,
                tracks : state.tracks.map((item,index) => {
                    if(item.id === state.currentTrack.id){
                        return {
                            ...item,
                            beacons: item.beacons.map((beacon) => {
                                if(beacon.id === state.currentCustomizingBeacon.id){
                                    return{
                                        ...beacon,
                                        imagePath: undefined
                                    }
                                }
                                return beacon;
                            })
                        }
                    }
                    return item;
                }),
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.map((beacon) => {
                        if(beacon.id === state.currentCustomizingBeacon.id){
                            return{
                                ...beacon,
                                imagePath:undefined
                            }
                        }
                        return beacon;
                    })
                }
            };

        case CONFIRM_CUSTOMIZE_BEACON:
            return{
                ...state,
                modalVisible:false,
                currentCustomizingBeacon:{
                    ...state.currentCustomizingBeacon,
                    riddle:{
                        ...state.currentCustomizingBeacon.beacon,
                        statement: undefined,
                        answer: undefined,
                        qrCode: undefined,
                    }
                },
                tracks : state.tracks.map((item,index) => {
                    if(item.id === state.currentTrack.id){
                        return {
                            ...item,
                            beacons: item.beacons.map((beacon) => {
                                if(beacon.id === state.currentCustomizingBeacon.id){
                                    return{
                                        ...beacon,
                                        name: state.currentCustomizingBeacon.name,
                                    }
                                }
                                return beacon;
                            })
                        }
                    }
                    return item;
                }),
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.map((beacon) => {
                        if(beacon.id === state.currentCustomizingBeacon.id){
                            return{
                                ...beacon,
                                name: state.currentCustomizingBeacon.name,
                            }
                        }
                        return beacon;
                    })
                }
            };

        case SET_CURRENT_BEACON_NAME:
            return{
                ...state,
                currentCustomizingBeacon:{
                    ...state.currentCustomizingBeacon,
                    name: action.name
                }
            };

        case SHOW_MODAL_ADD_RANDOM_RIDDLE:
            return{
                ...state,
                showModalRandomRiddle: true
            };

        case SHOW_MODAL_ADD_CUSTOM_RIDDLE:
            return{
                ...state,
                showModalCustomRiddle: true
            };

        case CLOSE_MODAL_ADD_CUSTOM_RIDDLE:
            return{
                ...state,
                showModalCustomRiddle: false
            };

        case CLOSE_MODAL_ADD_RANDOM_RIDDLE:
            return{
                ...state,
                showModalRandomRiddle: false
            };

        case RANDOM_RIDDLE_LOADING:
            return{
                ...state,
                showModalRandomRiddle: true,
                currentCustomizingBeacon : {
                    ...state.currentCustomizingBeacon,
                    riddle:{
                        ...state.currentCustomizingBeacon.riddle,
                        answer: "Fetching it's answer ...",
                        statement: "Fetching a random statement ..."
                    }
                },
            };

        case RANDOM_RIDDLE_LOADED:

            return setCurrentRiddle(state,{
                ... state.currentCustomizingBeacon.riddle,
                statement: action.riddle.question,
                answer: action.riddle.answer
            });

        case SET_CURRENT_BEACON_RIDDLE_ANSWER:
            return setCurrentRiddle(state,{
                ... state.currentCustomizingBeacon.riddle,
                answer: action.statement,
            });

        case SET_CURRENT_BEACON_RIDDLE_STATEMENT:
            return setCurrentRiddle(state,{
                ... state.currentCustomizingBeacon.riddle,
                statement: action.statement,
            });

        case SHOW_QR_CODE_PICKER:
            return{
                ...state,
                QRCodePickerVisible: true
            };

        case CLOSE_QR_CODE_PICKER:
            return{
                ...state,
                QRCodePickerVisible: false,
            };

        case SET_CURRENT_BEACON_QR_CODE:{

            return{
                ...state,
                showQRCodePicker: false,
                currentCustomizingBeacon : {
                    ...state.currentCustomizingBeacon,
                    qrCode: action.code
                },
                tracks : state.tracks.map((item,index) => {
                    if(item.id === state.currentTrack.id){
                        return {
                            ...item,
                            beacons: item.beacons.map((beacon) => {
                                if(beacon.id === state.currentCustomizingBeacon.id){
                                    return{
                                        ...beacon,
                                        qrCode: action.code
                                    }
                                }
                                return beacon;
                            })
                        }
                    }
                    return item;
                }),
                currentTrack:{
                    ...state.currentTrack,
                    beacons:state.currentTrack.beacons.map((beacon) => {
                        if(beacon.id === state.currentCustomizingBeacon.id){
                            return{
                                ...beacon,
                                qrCode: action.code
                            }
                        }
                        return beacon;
                    })
                }
            };

        }

        case SHOW_MODAL_BEACON_ID:
            return{
                ...state,
                modalBeaconIDVisible: true
            };

        case CLOSE_MODAL_BEACON_ID:
            return{
                ...state,
                modalBeaconIDVisible: false,
            };

        default:
            return state;
    }
};

export function setCurrentRiddle(state,newRiddle){
    return{
        ...state,
        currentCustomizingBeacon : {
            ...state.currentCustomizingBeacon,
            riddle: newRiddle
        },
        tracks : state.tracks.map((item,index) => {
            if(item.id === state.currentTrack.id){
                return {
                    ...item,
                    beacons: item.beacons.map((beacon) => {
                        if(beacon.id === state.currentCustomizingBeacon.id){
                            return{
                                ...beacon,
                                riddle: newRiddle
                            }
                        }
                        return beacon;
                    })
                }
            }
            return item;
        }),
        currentTrack:{
            ...state.currentTrack,
            beacons:state.currentTrack.beacons.map((beacon) => {
                if(beacon.id === state.currentCustomizingBeacon.id){
                    return{
                        ...beacon,
                        riddle: newRiddle
                    }
                }
                return beacon;
            })
        }
    };
}