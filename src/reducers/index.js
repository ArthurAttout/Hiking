import { combineReducers } from 'redux';
import {DATA_AVAILABLE, INFO_CLICK} from "../actions/actionsCreateGame" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const gameModesReducer = (state = dataState, action) => {
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

// Combine all the reducers
const rootReducer = gameModesReducer;

export default rootReducer;