import { combineReducers } from 'redux';
import gameModesReducer from './gameModesReducer'
import createGameMapReducer from './createGameMapReducer'

const rootReducer = combineReducers({
    gameModesReducer,
    createGameMapReducer
});

export default rootReducer;