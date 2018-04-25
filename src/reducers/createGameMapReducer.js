import {
    DRAG_BEACON, SETUP_INITIAL_MAP, ADD_NEW_BEACON, TOGGLE_TRACKING,
    TOUCH_BEACON,CENTER_REGION_CHANGED, CONFIRM_PATH, CLEAR_PATH
} from "../actions/actionsCreateGameMap";

import {FOCUS_ON_BEACON,SUBMIT_TRACK_NAME,TRACK_NAME_CHANGED,EDIT_TRACK_NAME,CANCEL_CUSTOMIZE_BEACON,CONFIRM_CUSTOMIZE_BEACON,
    EDIT_TRACK,CLEAR_BEACONS,DELETE_TRACK,ADD_NEW_TRACK,CLOSE_MODAL,REQUEST_MODAL,SET_IMAGE_PATH,SET_CURRENT_BEACON_NAME
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
    modalVisible:false,
    currentCustomizingBeacon: {
        name:undefined,
        imagePath:undefined,
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
                tracks:state.tracks.concat({
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
            return newState;

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

        case CONFIRM_PATH:
            return {
                ...state,
                confirmLinkedBeacons: false,
                tracks:state.tracks.map((track,index) => {
                    if(track.id === state.currentTrack.id){
                        return {
                            ...track,
                            path:state.currentTrack.path,
                            totalDistance: action.totalDistance,
                            altitudeDelta: action.totalDelta
                        }
                    }
                    return track;
                })
            };

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
            return{
                ...state,
                sideMenuOpened: true,
                tracks: state.tracks.map((item) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            trackName: action.payload.newName
                        }
                    }
                    return item;
                })
            };

        case SUBMIT_TRACK_NAME:
            return{
                ...state,
                sideMenuOpened:false,
                tracks: state.tracks.map((item) => {
                    if(item.id === action.payload.id){
                        return {
                            ...item,
                            isNameEditable:false
                        }
                    }
                    return item;
                })
            };

        case FOCUS_ON_BEACON:
            let res = {
                ...state,
                regionFocus:{
                    latitudeDelta: state.centerRegion.latitudeDelta,
                    longitudeDelta: state.centerRegion.longitudeDelta,
                    latitude: action.payload.coordinate.latitude,
                    longitude: action.payload.coordinate.longitude,
                },
                centerRegion:undefined
            };
            console.log(res);
            return res;

        case CLOSE_MODAL:
            return{
                ...state,
                modalVisible:false
            };

        case REQUEST_MODAL:
            return{
                ...state,
                modalVisible:true,
                currentCustomizingBeacon: action.beacon
            };

        case SET_IMAGE_PATH:
            return {
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

        default:
            return state;
    }
};