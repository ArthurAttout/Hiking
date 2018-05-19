import {GAME_MODES} from '../utils/constants'

export function getGameModes(){
    return [
        {"title":"Mode normal","mode":GAME_MODES.NORMAL,"info":"Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt lenunculos vel innare temere contextis cratibus parant, effusae legiones, quae hiemabant tunc apud Siden, isdem impetu occurrere veloci. et signis prope ripam locatis ad manus comminus conserendas denseta scutorum conpage semet scientissime praestruebant, ausos quoque aliquos fiducia nandi vel cavatis arborum truncis amnem permeare latenter facillime trucidarunt."},
        {"title":"Avec énigmes et QR code","mode":GAME_MODES.RIDDLES_AND_QR_CODE,"info":"Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt lenunculos vel innare temere contextis cratibus parant, effusae legiones, quae hiemabant tunc apud Siden, isdem impetu occurrere veloci. et signis prope ripam locatis ad manus comminus conserendas denseta scutorum conpage semet scientissime praestruebant, ausos quoque aliquos fiducia nandi vel cavatis arborum truncis amnem permeare latenter facillime trucidarunt."},
        {"title":"Avec énigmes","mode":GAME_MODES.RIDDLES,"info":"Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt lenunculos vel innare temere contextis cratibus parant, effusae legiones, quae hiemabant tunc apud Siden, isdem impetu occurrere veloci. et signis prope ripam locatis ad manus comminus conserendas denseta scutorum conpage semet scientissime praestruebant, ausos quoque aliquos fiducia nandi vel cavatis arborum truncis amnem permeare latenter facillime trucidarunt."},
    ]
}

export function getGameTeams(gameCode){
    return [
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
}

export function isCodePlayer(gameCode) {
    // TODO replace with contact to server
    if(gameCode.toLowerCase() === ("GM").toLowerCase()) {
        return false
    } else {
        return true
    }
}

export function isGameReady(gameCode) {
    if(gameCode.toLowerCase() === ("ABCD").toLowerCase()) {
        return false;
    } else {
        return true;
    }
}

export function sendClientDataToServer(gameCode, playerName, teamNam) {

}

export function getDataFromServer(gameCode) {
    return [
        {
            "gameMode": 1,
            "shrinkSpeed": 5,
            "mapViewEnabled": true,
            "nextBeaconVisible": true,
            "displayDropDistance": false,
            "lives": 0,
            "timerRiddle": 0,
        }
    ]
}

export function getNextBeacon(gameCode, teamName) {
    return [
        {
            "id": 0,
            "latitude": 50.228820,
            "longitude": 5.335657,
            "name": "NextBeacon",
            "iconUrl": "",
            "qrCodeId": "",
            "riddleId":  0,
            "riddleStatement": "Mon coup n'est pas fatal mais je fais parfois mal souvent je suis dressé et je sens bon la marée, qui suis je ?",
            "riddleAnswer": "Ma bite",
        }
    ]
}