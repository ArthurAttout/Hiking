export const INPUT_CODE = 'INPUT_CODE';
export const JOIN_TEAM = 'JOIN_TEAM';
export const TOGGLE_GAME_READY = 'TOGGLE_GAME_READY';

export const inputCode = (gameCode,playerName) =>{
    return{
        type:INPUT_CODE,
        gameCode:gameCode,
        playerName:playerName
    }
};

export const joinTeam = (team) =>{
    return{
        type:JOIN_TEAM,
        teamName:team
    }
};

export const toggleGameReady = () =>{
    return{
        type:TOGGLE_GAME_READY
    }
};



export function getGameModes(){
    return (dispatch) => {
        setTimeout(() => {
            const data  = [
                {"title":"Team 1"},
                {"title":"Team 2"},
                {"title":"Team 3"},
                {"title":"Team 4"},
                {"title":"Team 5"},
                {"title":"Team 6"},
                {"title":"Team 7"},
                {"title":"Team 8"},
                {"title":"Team 9"},
                {"title":"Team 10"},
                {"title":"Team 11"},
                {"title":"Team 12"}
            ]
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);

    };
}