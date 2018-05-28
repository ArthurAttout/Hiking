export const GAME_MODES = Object.freeze(
    {
        "NORMAL":1,
        "RIDDLES":2,
        "RIDDLES_AND_QR_CODE":3,
    });

export const COLORS = Object.freeze(
    {
        "Primary":"#558b2f",
        "Secondary":"#85bb5c",
        "Primary_accent":"#255d00",
    });

export const GLOBAL_SETTINGS = Object.freeze(
    {
        "OUT_OF_ZONE_TIMEOUT": 30000,   // in ms
        "BEACON_RADIUS_THRESHOLD": 5,   // in meters
    }
);

export const prepareRequest = (params,method) => {

    return {
        method: method,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(params)
    };
};
