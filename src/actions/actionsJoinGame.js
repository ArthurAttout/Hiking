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