export const CHANGE_GAMEMASTER_SIDE_MENU_OPENED = 'CHANGE_GAMEMASTER_SIDE_MENU_OPENED';

export const changeSideMenuOpened = (isOpen) => {
    return{
        type: CHANGE_GAMEMASTER_SIDE_MENU_OPENED,
        payload: isOpen
    }
};

