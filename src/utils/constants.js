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

export const prepareRequest = (params,method) => {
    let esc = encodeURIComponent;
    let body = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    return {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        body: body
    };
};