import { AppRegistry } from 'react-native';
import App from './App';
import stacktrace from 'react-native-stacktrace';

stacktrace.init(function onError(err, isFatal) {
    return new Promise((resolve, reject) => {
        // log to your own logging service
        return doAsyncThingWithError(err, isFatal)
            .then(resolve)
            .catch(reject);
    });
});


AppRegistry.registerComponent('Hiking', () => App);