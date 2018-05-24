
import store from '../config/store'
export const FORCE_REFRESH= 'FORCE_REFRESH';
export const CHANGE_GAMEMASTER_SIDE_MENU_OPENED = 'CHANGE_GAMEMASTER_SIDE_MENU_OPENED';
export const SET_CONTINUOUS_REFRESH = 'SET_CONTINUOUS_REFRESH';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';
export const FETCHING_NEW_POSITIONS  = 'FETCHING_NEW_POSITIONS';
export const SET_INTERVAL_ID = "SET_INTERVAL_ID";
export const FETCHED_NEW_POSITIONS= 'FETCHED_NEW_POSITIONS';
export const REQUEST_MODAL_TEAM = 'REQUEST_MODAL_TEAM';
export const START_GAME = 'START_GAME';
export const ERROR_START = 'ERROR_START';
export const FETCHING_START= 'FETCHING_START';
export const START_FETCHED = 'START_FETCHED';

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_GAMEMASTER_SIDE_MENU_OPENED,
        isOpen: isOpen
    }
};

export const forceRefresh = () => {
    return{
        type: FORCE_REFRESH
    }
};

export const setContinuousRefresh = (value) => {
    return{
        type: SET_CONTINUOUS_REFRESH,
        value: value
    }
};

export const updatePositions = () => {
    return dispatch => {
        dispatch(fetchingNewPositions());
        fetch("http://jservice.io/api/random")
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                dispatch(newPositionsFetched({
                    teams:store.getState().gameMasterScreenReducer.teams.map((team) => {
                        return{
                            ...team,
                            coordinate:{
                                latitude: team.coordinate.latitude + 0.0001,
                                longitude: team.coordinate.longitude + 0.0001,
                            }
                        }
                    })
                }))
        });
    }
};

export const fetchingNewPositions = () => {
    return{
        type: FETCHING_NEW_POSITIONS,
    }
};

export const newPositionsFetched = (positions) => {
    return{
        type: FETCHED_NEW_POSITIONS,
        newPositions: positions.teams,
    }
};

export const showBeaconsOfTeam = (team) => {
    return{
        type:""
    }
};

export const startGame = () => {
    return dispatch => {
        let gameCode = store.getState().joinGameReducer.gameCode;
        fetch("https://hikong.masi-henallux.be:5000/" + gameCode +"/BattleReady")
            .then((response) => {
                if(response.ok){
                    dispatch(startFetched())
                }
                else {
                    dispatch(errorStart("An error has occured, please try again later"));
                }
            });
        dispatch(fetchingStart());
    }
};

export const fetchingStart = () => {
    return{
        type: FETCHING_START
    }
};

export const startFetched = () => {
    return{
        type: START_FETCHED
    }
};

export const errorStart = (message) => {
    return{
        type: ERROR_START,
        message: message
    }
};

export const onRequestModal = (team) => {
    return{
        type:REQUEST_MODAL_TEAM,
        team: team,
    }
};