import {ADD_NEW_TEAM,CLOSE_MODAL_TEAM_EDITOR,SHOW_MODAL_TEAM_EDITOR,
    POPULATE_DROPDOWN,TEAM_NAME_CHANGED,DELETE_TEAM} from '../actions/actionsAssignTeams'

let dataState = {
    teams: [

    ],
    modalTeamEditorVisible: false,
    tracksDropdown:[

    ],
    isValid: false,
    currentEditingTeam: undefined,
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
                modalTeamEditorVisible: true,
                currentEditingTeam: action.team,
            };

        case CLOSE_MODAL_TEAM_EDITOR:
            let newres = {
                ...state,
                modalTeamEditorVisible: false,
                teams: state.teams.map((item) => {
                    if(item.id === state.currentEditingTeam.id){
                        return{
                            ...item,
                            track: action.track
                        }
                    }
                    return item;
                }),
                currentEditingTeam: undefined,
            };
            return{
                ...newres,
                isValid: !newres.teams.some(t => t.track === undefined)
            };

        case POPULATE_DROPDOWN:
            return{
                ...state,
                tracksDropdown: action.tracksDropdown
            };

        case TEAM_NAME_CHANGED:
            return{
                ...state,
                teams: state.teams.map((item) => {
                    if(item.id === state.currentEditingTeam.id){
                        return{
                            ...item,
                            name: action.newname
                        }
                    }
                    return item;
                })
            };

        case DELETE_TEAM:
            return{
                ...state,
                modalTeamEditorVisible: false,
                teams: state.teams.filter((item) => item.id !== state.currentEditingTeam.id),
                currentEditingTeam: undefined
            };

        default:
            return state;
    }
};