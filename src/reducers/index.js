import { combineReducers } from 'redux';
import {DATA_AVAILABLE, INFO_CLICK} from "../actions/actionsChooseMode" //Import the actions types constant we defined in our actions
import {SWITCH_MAP_ENABLED,
    SWITCH_NEXT_BEACON_VISIBLE,
    SWITCH_DROP_DISTANCE_VISIBLE,SET_SHRINK_DElAY,
    SET_NUMBER_LIVES,SET_TIMER_MAX_RIDDLE} from "../actions/actionsSettingsGame";

let dataState = { data: [], loading:true };

const gameModesReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            return {
                ...state,
                data:action.payload,
                loading:false
            };

        case SWITCH_MAP_ENABLED:
            return{
                ...state,
                viewMapEnabled:action.mapEnabled
            };

        case SWITCH_NEXT_BEACON_VISIBLE:
            return{
                ...state,
                nextBeaconVisibilityEnabled:action.nextBeaconVisibilityEnabled
            };

        case SWITCH_DROP_DISTANCE_VISIBLE:
            return{
                ...state,
                dropDistanceVisibilityEnabled:action.dropDistanceVisibilityEnabled
            };

        case SET_TIMER_MAX_RIDDLE:
            return{
                ...state,
                timerMaxRiddle:action.timerMaxRiddle
            };

        case SET_NUMBER_LIVES:
            return{
                ...state,
                numberLives:action.numberLives
            };

        case SET_SHRINK_DElAY:
            return{
                ...state,
                shrinkDelay:action.shrinkDelay
            };

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = gameModesReducer;

export default rootReducer;