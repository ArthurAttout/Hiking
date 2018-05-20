
let dataState = {
    sideMenuOpened: false,
    centerRegion:{
        latitude:  50.223777,
        longitude: 5.335017,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }
};

export default function gameMasterScreenReducer (state = dataState, action) {
    switch (action.type) {

        default:
            return state;
    }
};