import {REGISTER_MESSAGE_TEAM,REGISTER_START_GAME_NOW} from "../actions/notificationsActions";

let dataState = {

};

export default function assignTeamsReducer (state = dataState, action) {
    switch (action.type) {

        case REGISTER_MESSAGE_TEAM:
            return{
                ...state,
                messageTeamRegistered: true,
            };

        case REGISTER_START_GAME_NOW:
            return{
                ...state,
                startGameNowRegistered: true,
            };
        default:
            return state;
    }
};