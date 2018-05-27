import store from "../config/store";
import {calculateBearing, calculateDistance} from "../utils/geometryUtils";
import {navigatorRef} from "../../App";
import {NavigationActions} from 'react-navigation';
import {prepareRequest} from "../utils/constants";

export const STORE_SERVER_DATA = 'STORE_SERVER_DATA';
export const STORE_NEXT_BEACON = 'STORE_NEXT_BEACON';
export const STORE_CURRENT_LOCATION = 'STORE_CURRENT_LOCATION';
export const SET_MAP_VIEW_VISIBLE = 'SET_MAP_VIEW_VISIBLE';
export const STORE_BEARING = 'STORE_BEARING';
export const PLAYER_INSIDE_BEACON = 'PLAYER_INSIDE_BEACON';
export const RIDDLE_SOLVING_CLOSE_MODAL = 'RIDDLE_SOLVING_CLOSE_MODAL';
export const RIDDLE_SOLVING_REQUEST_MODAL = 'RIDDLE_SOLVING_REQUEST_MODAL';
export const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
export const CONFIRM_RIDDLE_SOLVING = 'CONFIRM_RIDDLE_SOLVING';
export const RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED = 'RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED';
export const STORE_END_GAME_STATS = 'STORE_END_GAME_STATS';
export const STORE_TEAM_INFO = 'STORE_TEAM_INFO';
export const DECREMENT_TEAM_LIVE = 'DECREMENT_TEAM_LIVE';
export const SHRINK_ZONE = 'SHRINK_ZONE';
export const CENTER_REGION_CHANGED = 'CENTER_REGION_CHANGED';
export const STORE_TIMER_IDS = 'STORE_TIMER_IDS';
export const OUT_OF_ZONE_CLOSE_MODAL = 'OUT_OF_ZONE_CLOSE_MODAL';
export const OUT_OF_ZONE_REQUEST_MODAL = 'OUT_OF_ZONE_REQUEST_MODAL';



export const storeTeamInfo = (teamInfo) => {
    return{
        type: STORE_TEAM_INFO,
        teamInfo: teamInfo
    }
};

// TODO view what to store
export const storeServerData = (json) =>{
    // TODO filter based on game mode
    return{
        type:STORE_SERVER_DATA,
        admin: json.admin,
        game: json.game,
        settings: json.settings
    }
};

export const getNextBeacon = () => {
    return (dispatch) => {
        let params = {
            name: store.getState().joinGameReducer.playerName,
            lives: store.getState().gameDataReducer.teamInfo.lives
        };
        let request = prepareRequest(params, "POST");
        console.log("Requesting next beacon with /confirmpoint");
        console.log("Parameters");
        console.log(params);
        console.log("Request");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/confirmpoint', request)
            .then((response) => {
                console.log("Response :");
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                // TODO gerer cas d'erreur
                if (!json.hasError) {
                    dispatch(storeNextBeacon(json));
                    navigatorRef.dispatch(NavigationActions.navigate({
                        routeName: "GameScreen"
                    }));
                }
            })
    }
};

export const getNextBeaconNoConfirm = () => {
    return (dispatch) => {
        let params = {
            nameTeam: store.getState().joinGameReducer.teamName,
        };
        let request = prepareRequest(params, "POST");
        console.log("Requesting next beacon with /nextpoint");
        console.log("Parameters");
        console.log(params);
        console.log("Request");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/nextpoint', request)
            .then((response) => {
                console.log("Response :");
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                // TODO gerer cas d'erreur
                if (!json.hasError) {
                    dispatch(storeNextBeacon(json));
                    // close modal if player had it open
                    dispatch(onCloseRiddleSolvingModal());
                    // check if this beacon is the last beacon
                    if(store.getState().gameDataReducer.nextBeacon.lastBeacon) {
                        // means the user who entered the answer had game over
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName: "GameOverScreen"
                        }));
                    } else {
                        navigatorRef.dispatch(NavigationActions.navigate({
                            routeName: "GameScreen"
                        }));
                    }
                }
            })
    }
};

export const getLastBeacon = () => {
    return (dispatch) => {
        let params = {
            name: store.getState().joinGameReducer.playerName,
        };
        let request = prepareRequest(params, "POST");
        console.log("Requesting next beacon with /lastpoint");
        console.log("Parameters");
        console.log(params);
        console.log("Request");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/lastpoint', request)
            .then((response) => {
                console.log("Response :");
                console.log(response);
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                // TODO gerer cas d'erreur
                if (!json.hasError) {
                    dispatch(storeNextBeacon(json));
                    // close modal if player had it open
                    dispatch(onCloseRiddleSolvingModal());
                    navigatorRef.dispatch(NavigationActions.navigate({
                        routeName: "GameOverScreen"
                    }));
                }
            })
    }
};


export const storeNextBeacon = (nextBeacon) =>{
    return{
        type:STORE_NEXT_BEACON,
        name: nextBeacon.name,
        iconURL: nextBeacon.iconURL,
        latitude: nextBeacon.latitude,
        longitude: nextBeacon.longitude,
        statement: nextBeacon.statement,
        answer: nextBeacon.answer,
        lastBeacon: nextBeacon.lastBeacon
    }
};

export const storeCurrentLocation = (currentLocation) =>{
    return{
        type:STORE_CURRENT_LOCATION,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
        heading: currentLocation.heading,
        speed: currentLocation.speed,
        accuracy: currentLocation.accuracy,
        error: currentLocation.error,
    }
};

export const refreshPosition = () => {
    return () => {
        let params = {
            pseudonyme: store.getState().joinGameReducer.playerName,
            latitude: store.getState().gameDataReducer.currentLocation.latitude,
            longitude: store.getState().gameDataReducer.currentLocation.longitude
        };
        let request = prepareRequest(params, "PUT");
        console.log("Refreshing position with /refreshpos");
        console.log("Parameters");
        console.log(params);
        console.log("Request");
        console.log(request);
        fetch('https://hikong.masi-henallux.be:5000/refreshpos', request)
            .then((response) => {
                console.log("Response :");
                console.log(response);;
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {
                        hasError: true
                    }
                }
            })
            .then((json) => {
                if (!json.hasError) {
                    // TODO gerer cas d'erreur?
                }
            });
    }
};

export const checkPlayerInsideBeacon = () => {
    return (dispatch) => {
        if (calculateDistance(store.getState().gameDataReducer.currentLocation,
                store.getState().gameDataReducer.nextBeacon) < 5) {
            if (store.getState().gameDataReducer.nextBeacon.lastBeacon === true) {
                //TODO get track stat from server
                let params = {
                    playercode: store.getState().gameDataReducer.game.PlayerCode,
                    name: store.getState().gameDataReducer.teamInfo.name
                };
                let request = prepareRequest(params, "POST");
                console.log("Getting game stats /end");
                console.log("Parameters");
                console.log(params);
                console.log("Request");
                console.log(request);
                fetch('https://hikong.masi-henallux.be:5000/end', request)
                    .then((response) => {
                        console.log(response);
                        if (response.ok) {
                            return response.json()
                        }
                        else {
                            return {
                                hasError: true
                            }
                        }
                    })
                    .then((json) => {
                        if (!json.hasError) {
                            dispatch(storeEndGameStats(json));
                        }
                    });
                navigatorRef.dispatch(NavigationActions.navigate({
                    routeName: "EndGameScreen"
                }));
            } else {
                navigatorRef.dispatch(NavigationActions.navigate({
                    routeName: "BeaconScreen"
                }));
            }
        }
    }
};

export const storeBearing = () => {
    var bearing = 0;
    const absoluteBearing = calculateBearing(
        store.getState().gameDataReducer.currentLocation,
        store.getState().gameDataReducer.nextBeacon);

    //calculate the difference between calculated bearing and the GPS heading value
    if(store.getState().gameDataReducer.currentLocation.heading != null &&
        !isNaN(parseFloat(store.getState().gameDataReducer.currentLocation.heading)))
    {
        // NB: 45 degrees less because arrow is already tilted at 45 degrees
        bearing = ((store.getState().gameDataReducer.currentLocation.heading - absoluteBearing) * -1) - 45;
    } else {
        console.log("Current location heading not valid, using absoluteBearing");
        bearing = absoluteBearing;
    }

    return{
        type:STORE_BEARING,
        bearing: bearing
    }
};

export const setMapViewVisible = (mapViewVisible) =>{
    return{
        type:SET_MAP_VIEW_VISIBLE,
        mapViewVisible: mapViewVisible,
    }
};

export const onCloseRiddleSolvingModal = () => {
    return{
        type:RIDDLE_SOLVING_CLOSE_MODAL,
    }
};

export const onRequestRiddleSolvingModal = () => {
    return{
        type: RIDDLE_SOLVING_REQUEST_MODAL,
    }
};

export const onCloseOutOfZoneModal = () => {
    return{
        type:OUT_OF_ZONE_CLOSE_MODAL,
    }
};

export const onRequestOutOfZoneModal = () => {
    return{
        type: OUT_OF_ZONE_REQUEST_MODAL,
    }
};

export const onConfirmRiddleSolving = ()=>{
    if(store.getState().gameDataReducer.currentAnswer.toLowerCase() ===
        store.getState().gameDataReducer.nextBeacon.riddleAnswer.toLowerCase()) {
        store.dispatch(getNextBeacon());
        store.dispatch(onCloseRiddleSolvingModal());
        navigatorRef.dispatch(NavigationActions.navigate({routeName:"GameScreen"}));
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: true,
            currentAnswer: '',
        }
    } else {
        store.dispatch(decrementTeamLive());
        if(store.getState().gameDataReducer.teamInfo.lives === 0){
            store.dispatch(gameOver())
        }
        return {
            type: CONFIRM_RIDDLE_SOLVING,
            correctAnswer: false,
            currentAnswer: store.getState().gameDataReducer.currentAnswer,
        }
    }
};

export const decrementTeamLive = () => {
    return {
        type: DECREMENT_TEAM_LIVE,
        teamLives: (store.getState().gameDataReducer.teamInfo.lives - 1)
    }
};

export const gameOver = () => {
    store.dispatch(onCloseOutOfZoneModal());
    //TODO navigate to a GAME OVER screen then to the last beacon
    store.dispatch(getNextBeacon());
    navigatorRef.dispatch(NavigationActions.navigate({routeName:"GameOverScreen"}));
};

export const setCurrentAnswer = (answer) => {
    return {
        type:SET_CURRENT_ANSWER,
        currentAnswer: answer,
        isSubmitButtonPressed: false
    }
};

export const submitButtonPressed = () => {
    if(!store.getState().gameDataReducer.correctAnswer) {
        return {
            type: RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED,
            isSubmitButtonPressed: true
        }
    } else {
        return {
            type: RIDDLE_SOLVING_SUBMIT_BUTTON_PRESSED,
            isSubmitButtonPressed: false
        }
    }
};

export const storeEndGameStats = (json) => {
    return {
        type:STORE_END_GAME_STATS,
        classement: json.classement,
        totalTeams: json.totalTeams,
        score: json.score,
        time: json.time
    }
};

export const shrinkZone = () => {
    console.log("Shrink Zone shrinked from " + store.getState().gameDataReducer.settings.radius + "m to "
    + (store.getState().gameDataReducer.settings.radius -
            store.getState().gameDataReducer.settings.tresholdShrink) + "m");

    // TODO check is player is outside of the zone (measure distance between user location and central point and compare to radius)
    let playerDistanceToCenter = calculateDistance(
        {
            latitude: store.getState().gameDataReducer.currentLocation.latitude,
            longitude: store.getState().gameDataReducer.currentLocation.longitude
        },
        {
            latitude: store.getState().gameDataReducer.game.center_x,
            longitude: store.getState().gameDataReducer.game.center_y
        },
    );

    if(playerDistanceToCenter > store.getState().gameDataReducer.settings.radius){
        store.dispatch(onRequestOutOfZoneModal());
    }

    return{
        type: SHRINK_ZONE,
        shrinkZoneRadius: (store.getState().gameDataReducer.settings.radius -
                            store.getState().gameDataReducer.settings.tresholdShrink)
    }
};

export const onRegionChange = (newRegion) => {
    return{
        type:CENTER_REGION_CHANGED,
        newRegion: newRegion
    }
};

export const storeTimerIds = (ids) => {
    return {
        type: STORE_TIMER_IDS,
        ids : ids
    }
};

export const riddleTimeOut = () => {
    // make sure team has enough life points
    store.dispatch(decrementTeamLive())
    // show toast with answer to the riddle
    if(store.getState().gameDataReducer.teamInfo.lives <= 0){
        // go to game over
    } else {
        // confirm point and move on
    }
};


