import { combineReducers } from 'redux';
import gameModesReducer from './gameModesReducer'
import createGameMapReducer from './createGameMapReducer'
import joinGameReducer from './joinGameReducer'
import settingsReducer from './settingsReducer'
import assignTeamsReducer from './assignTeamsReducer'

const rootReducer = combineReducers({
    gameModesReducer,
    settingsReducer,
    createGameMapReducer,
    assignTeamsReducer,
    joinGameReducer
});

export default rootReducer;