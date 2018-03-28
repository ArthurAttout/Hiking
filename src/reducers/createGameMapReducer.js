import {
    DRAG_BEACON, SETUP_INITIAL_MAP, ADD_NEW_BEACON, TOGGLE_TRACKING,
    TOUCH_BEACON, ADD_NEW_TRACK,CENTER_REGION_CHANGED,DELETE_TRACK,
    EDIT_TRACK
} from "../actions/actionsCreateGameMap";
import UUIDGenerator from 'react-native-uuid-generator';

let dataState = {
    loading: true,
    currentTrack:{
        beacons:[]
    },
    tracks: [],               //All the tracks the user made
    isTrackingMode: false,
    newCenteredRegion: undefined
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
                    })
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
                return newState;
            }
            return state;

        case DRAG_BEACON:

            return {
                ...state,
                currentPath:state.currentPath.map((beacon,index) => {
                    if(beacon.id === action.draggedBeacon.id){
                        return {
                            ...beacon,
                            latitude:action.newCoordinates.latitude,
                            longitude:action.newCoordinates.longitude
                        }
                    }
                    return beacon;
                }),
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
                    })},

                tracks:state.tracks.map((track,index) => {
                    return {
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
                        })
                    };
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

        default:
            return state;
    }
};