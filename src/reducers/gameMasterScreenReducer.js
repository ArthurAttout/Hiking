import {
    FORCE_REFRESH, SET_CONTINUOUS_REFRESH, CHANGE_GAMEMASTER_SIDE_MENU_OPENED,REQUEST_MODAL_TEAM,
    FETCHED_NEW_POSITIONS, FETCHING_NEW_POSITIONS, SET_INTERVAL_ID, UPDATE_POSITIONS, START_GAME,
    ERROR_START,FETCHING_START,START_FETCHED,TEAMS_FETCHED,SHOW_MESSAGING_MODAL,CLOSE_TEAM_MESSAGING_MODAL,
    SET_MESSAGE_BODY,SET_MESSAGE_TITLE,MESSAGE_SENDING_FAILED,FETCHING_SENDING_MESSAGE,SHOW_TEAM_BEACONS
} from "../actions/actionsGameMasterScreen";

let dataState = {
    showStartButton: true,
    sideMenuOpened: false,
    centerRegion:{
        latitude:  50.223777,
        longitude: 5.335017,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    },
    teams:[

    ],
    beaconsToShow:[

    ]
};

export default function gameMasterScreenReducer (state = dataState, action) {
    switch (action.type) {

        case CHANGE_GAMEMASTER_SIDE_MENU_OPENED:
            return{
                ...state,
                sideMenuOpened: action.isOpen,
            };

        case FETCHING_NEW_POSITIONS:
            return{
                ...state,
                showProgressStatus: true,
            };

        case SHOW_TEAM_BEACONS:
            return{
                ...state,
                beaconsToShow: action.team.trip.beacons
            };

        case TEAMS_FETCHED:
            console.log("I have " + action.teams.length + " teams");
            return {
                ...state,
                teams: action.teams.map((team) => {
                    let totLat = 0;
                    let totLong = 0;
                    team.players.forEach((player) => totLat += player.latitude);
                    team.players.forEach((player) => totLong += player.longitude);

                    return{
                        ...team,
                        id: team.idTeam,
                        color: team.ColorHex,
                        coordinate:{
                            latitude: team.players.length > 0 ? totLat / team.players.length : 0,
                            longitude: team.players.length > 0 ? totLong / team.players.length : 0,
                        }
                    }
                }),
                continuousRefresh: true,
            };


        case FETCHED_NEW_POSITIONS:
            console.log("I have " + action.teams.length + " teams");
            return{
                ...state,
                teams: action.teams.map((team) => {
                    let totLat = 0;
                    let totLong = 0;
                    team.players.forEach((player) => totLat += player.latitude);
                    team.players.forEach((player) => totLong += player.longitude);

                    return{
                        ...team,
                        color: team.ColorHex,
                        id: team.idTeam,
                        coordinate:{
                            latitude: team.players.length > 0 ? totLat / team.players.length : 0,
                            longitude: team.players.length > 0 ? totLong / team.players.length : 0,
                        }
                    }
                })
            };

        case START_GAME:
            return{
                ...state,
                showStartButton: false,
            };

        case REQUEST_MODAL_TEAM:
            return{
                ...state,
            };

        case FETCHING_START:
            return{
                ...state,
                showProgressStart : true,
                showStartButton: false,
            };

        case START_FETCHED:
            return {
                ...state,
                showProgressStart: false,
                showStartButton: false,
                isGameStarted: true,
            };

        case ERROR_START:
            return{
                ...state,
                errorMessage: action.message,
                showProgressStart: false,
                showStartButton: true
            };

        case SHOW_MESSAGING_MODAL:
            return{
                ...state,
                teamMessagingModalVisible: true,
                teamDestination: action.teamDestination
            };

        case CLOSE_TEAM_MESSAGING_MODAL:
            return{
                ...state,
                teamMessagingModalVisible: false,
                showMessagingProgress: false,
            };

        case FETCHING_SENDING_MESSAGE:
            return{
                ...state,
                showMessagingProgress: true
            };

        case MESSAGE_SENDING_FAILED:
            return{
                ...state,
                showMessagingProgress: false
            };

        case SET_MESSAGE_BODY:
            return{
                ...state,
                messageBody: action.body
            };

        case SET_MESSAGE_TITLE:
            return{
                ...state,
                messageTitle: action.title
            };


        default:
            return state;
    }
};