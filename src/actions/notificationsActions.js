export const REGISTER_START_GAME_NOW = 'REGISTER_START_GAME_NOW';
export const REGISTER_MESSAGE_TEAM = 'REGISTER_MESSAGE_TEAM';

export const registerStartGame = () => {
    return{
        type:REGISTER_START_GAME_NOW
    }
};

export const registerMessageTeam = () =>{

    return{
        type:REGISTER_MESSAGE_TEAM
    }
};