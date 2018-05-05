export const SWITCH_MAP_ENABLED = 'SWITCH_MAP_ENABLED';
export const SWITCH_NEXT_BEACON_VISIBLE = 'SWITCH_NEXT_BEACON_VISIBLE';
export const SWITCH_DROP_DISTANCE_VISIBLE = 'SWITCH_DROP_DISTANCE_VISIBLE';
export const SET_TIMER_MAX_RIDDLE = 'SET_TIMER_MAX_RIDDLE';
export const SET_NUMBER_LIVES = 'SET_NUMBER_LIVES';
export const SET_SHRINK_DElAY = 'SET_SHRINK_DELAY';
export const SET_CHOSEN_MODE = 'SET_CHOSEN_MODE';

export const setShrinkDelay = (evt) => {
    return {
        type:SET_SHRINK_DElAY,
        shrinkDelay:evt
    };
};

export const switchMapEnabled = (evt) => (
    {
        type:SWITCH_MAP_ENABLED,
        mapEnabled:evt
    }
);

export const switchNextBeaconVisibility = (evt) => (
    {
        type:SWITCH_NEXT_BEACON_VISIBLE,
        nextBeaconVisibilityEnabled:evt
    }
);

export const switchDropDistanceVisible = (evt) =>{
    return {
        type:SWITCH_DROP_DISTANCE_VISIBLE,
        dropDistanceVisibilityEnabled:evt
    };
};

export const setLives = (evt) =>{
    return {
      type:SET_NUMBER_LIVES,
      numberLives:evt
  }
};

export const setTimerMaxRiddle = (evt) =>(
    {
        type:SET_TIMER_MAX_RIDDLE,
        timerMaxRiddle:evt
    }
);

export const setChosenMode = (mode)=>(
    {
        type:SET_CHOSEN_MODE,
        mode:mode
    }
);