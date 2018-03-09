import { combineReducers } from 'redux';
import { DATA_AVAILABLE } from "../actions/actionsCreateGame" //Import the actions types constant we defined in our actions

let dataState = { data: [], loading:true };

const gameModesReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    gameModesReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;