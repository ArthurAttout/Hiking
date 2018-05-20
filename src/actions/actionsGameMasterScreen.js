export const FORCE_REFRESH= 'FORCE_REFRESH';
export const CHANGE_GAMEMASTER_SIDE_MENU_OPENED = 'CHANGE_GAMEMASTER_SIDE_MENU_OPENED';
export const SET_CONTINUOUS_REFRESH = 'SET_CONTINUOUS_REFRESH';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';
export const SET_INTERVAL_ID = "SET_INTERVAL_ID";

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_GAMEMASTER_SIDE_MENU_OPENED,
        payload: isOpen
    }
};

export const forceRefresh = () => {
    return{
        type: FORCE_REFRESH
    }
};

export const setContinuousRefresh = (value) => {
    return{
        type: SET_CONTINUOUS_REFRESH,
        value: value
    }
};

export const updatePositions = () => {
    console.log("updated positions");
    return{
        type:UPDATE_POSITIONS
    }
};

export const setIntervalID = (id) => {
    return{
        type:SET_INTERVAL_ID,
        id: id
    }
}