import { combineReducers } from 'redux';
import gameModesReducer from './gameModesReducer'
import createGameMapReducer from './createGameMapReducer'
import joinGameReducer from './joinGameReducer'

const rootReducer = combineReducers({
    gameModesReducer,
    createGameMapReducer,
    joinGameReducer
});

export default rootReducer;