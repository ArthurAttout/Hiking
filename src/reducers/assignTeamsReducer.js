import {ADD_NEW_TEAM,CLOSE_MODAL_TEAM_EDITOR,SHOW_MODAL_TEAM_EDITOR,
    POPULATE_DROPDOWN} from '../actions/actionsAssignTeams'

let dataState = {
    teams: [

    ],
    modalTeamEditorVisible: false,
    tracksDropdown:[

    ]
};

export default function assignTeamsReducer (state = dataState, action) {
    switch (action.type) {

        case ADD_NEW_TEAM:
            return{
                ...state,
                teams: state.teams.concat({
                    name: "Team " + (state.teams.length + 1),
                    id: action.id
                })
            };

        case SHOW_MODAL_TEAM_EDITOR:
            return{
                ...state,
                modalTeamEditorVisible: true
            };

        case CLOSE_MODAL_TEAM_EDITOR:
            return{
                ...state,
                modalTeamEditorVisible: false
            };

        case POPULATE_DROPDOWN:
            console.log(action.tracksDropdown);
            return{
                ...state,
                tracksDropdown: action.tracksDropdown
            };

        default:
            return state;
    }
};