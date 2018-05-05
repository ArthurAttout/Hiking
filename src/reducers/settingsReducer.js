import {
    SET_NUMBER_LIVES, SET_SHRINK_DElAY, SET_TIMER_MAX_RIDDLE, SWITCH_DROP_DISTANCE_VISIBLE, SWITCH_MAP_ENABLED,
    SWITCH_NEXT_BEACON_VISIBLE
} from "../actions/actionsSettingsGame";
import {DATA_AVAILABLE} from "../actions/actionsChooseMode";

let dataState = {

};

export default function settingsReducer (state = dataState, action) {
    switch (action.type) {
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