import {
    DRAG_BEACON, SETUP_INITIAL_MAP, ADD_NEW_BEACON, TOGGLE_TRACKING,
    TOUCH_BEACON
} from "../actions/actionsCreateGameMap";
import UUIDGenerator from 'react-native-uuid-generator';

let dataState = {
    loading: true,
    currentTrack:{
        beacons:[]
    },
    currentPath:[],
    tracks: [],               //All the tracks the user made
    confirmedTracks:[],       //All the tracks the user has confirmed (linked beacons)
    isTrackingMode: false,
    firstTouchedBeacon: undefined
};

export default function createGameMapReducer(state = dataState, action){
    switch (action.type) {
        case SETUP_INITIAL_MAP:
            let generatedUUID = UUIDGenerator.getRandomUUID();
            return {
                ...state,
                currentTrack: {
                    ...state.currentTrack,
                    id:generatedUUID
                },
                tracks: [{
                    id: generatedUUID,
                    beacons: []
                }],
                centerRegion:{
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
                                    latitude: action.latitude,
                                    longitude: action.longitude
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
                            latitude: action.latitude,
                            longitude: action.longitude
                        }
                    })
                }
            };

        case TOGGLE_TRACKING:
            return {
                ...state,
                isTrackingMode:true
            };

        case TOUCH_BEACON:
            if(state.isTrackingMode){
                let res;
                res = {
                    ...state,
                    confirmedTracks:state.confirmedTracks.map((track,index) =>{
                        if(track.id === state.currentTrack.id){
                            return{
                                ...track,
                                beacons: track.beacons.concat(action.touchedBeacon)
                            }
                        }
                        return track;
                    }),
                    currentPath:state.currentPath.concat({
                        id:action.touchedBeacon.id,
                        latitude:action.touchedBeacon.coordinate.latitude,
                        longitude:action.touchedBeacon.coordinate.longitude,
                    })
                };
                console.log("-------------------");
                console.log(res);
                console.log("-------------------");
                return res;
            }
            return state;

        case DRAG_BEACON:
            console.log("before : ");
            console.log(state);
            let res = {
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
            console.log("after : ");
            console.log(res);
            return res;

        default:
            return state;
    }
};