import { combineReducers } from 'redux';
import gameModesReducer from './gameModesReducer'
import createGameMapReducer from './createGameMapReducer'
import joinGameReducer from './joinGameReducer'
import settingsReducer from './settingsReducer'
import assignTeamsReducer from './assignTeamsReducer'
import gameDataReducer from './gameDataReducer'
import gameMasterScreenReducer from './gameMasterScreenReducer'

const rootReducer = combineReducers({
    gameModesReducer,
    settingsReducer,
    createGameMapReducer,
    assignTeamsReducer,
    joinGameReducer,
    gameDataReducer,
    gameMasterScreenReducer,
});

export default rootReducer;