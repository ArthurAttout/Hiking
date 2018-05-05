import {
    SET_NUMBER_LIVES, SET_SHRINK_DElAY, SET_TIMER_MAX_RIDDLE, SWITCH_DROP_DISTANCE_VISIBLE, SWITCH_MAP_ENABLED,
    SWITCH_NEXT_BEACON_VISIBLE
} from "../actions/actionsSettingsGame";
import {DATA_AVAILABLE} from "../actions/actionsChooseMode";

let dataState = { data: [], loading:true };

export default function gameModesReducer (state = dataState, action) {
    switch (action.type) {
        case DATA_AVAILABLE:
            return {
                ...state,
                data:action.payload,
                loading:false
            };


        default:
            return state;
    }
};